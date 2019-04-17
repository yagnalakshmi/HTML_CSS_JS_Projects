// Global app controller
//API key 5450b1271f23af89b8438456429a65e7 
//http://food2fork.com/api/search

import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

const state ={};

window.state = state;

//SearchController

const controlSearch = async() => {
    
    const query = searchView.getInput();
    
    
    if (query){//create new search obj
        
    state.search = new Search(query);
        
    //preparing the UI
    searchView.clearField();
    searchView.clearResult(); 
    renderLoader(elements.searchResult);
     try{
         //get the result
         await state.search.getResults();
        
         //display the result
         clearLoader();
         searchView.renderResult(state.search.result);
     } 
        catch(error){
            alert(error);
            clearLoader();
        }
    
    } 
    
    
}
elements.searchForm.addEventListener('submit', e => {
    
    e.preventDefault();
    controlSearch();
});


elements.searchResPage.addEventListener('click', e =>{
    
    const btn = e.target.closest('.btn-inline');
    
    if(btn){
        
        const gotoPage = parseInt(btn.dataset.goto, 10);
        //console.log(gotoPage)
        searchView.clearResult(); 
        searchView.renderResult(state.search.result, gotoPage);
    }
     
});

//Recipe Controller


const controlRecipe = async() =>{
    
    const id = window.location.hash.replace('#', '');
    
    if(id){
        
        if(state.search) searchView.highlightRecipe(id);
        //creating recipe object
        state.recipe = new Recipe(id);
        window.r = state.recipe;
        
    }
    try{
        
        //preparing the UI
        clearLoader();
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
       
        //getting the recipe
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        //getting cooking time and serving time
        state.recipe.cookingTime();
        state.recipe.numOfServing();
        //render the recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
         );
        //console.log(state.recipe);
    }
    catch(error){
        
        alert(error);
        console.log(error);
    }
}
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event , controlRecipe));

//List Controller

const controlList = () =>{
    
    //create a list if there is none
    
    if(!state.list) state.list = new List();
    
    state.recipe.ingredients.forEach(el =>{
        
        
        
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        
        listView.renderItem(item);
    });
    
}


const controlLike = () =>{
    
    if(!state.likes) state.likes= new Likes();
    
    const currentId = state.recipe.id;
    
    //add to the state
    if(!state.likes.isLiked(currentId)){
        
      const like = state.likes.addLikes(
          state.recipe.id, 
          state.recipe.title, 
          state.recipe.author, 
          state.recipe.img);
        
        //toggle the button
        likeView.toggleLikeBtn(true);
        //update in the UI
        likeView.renderLikes(like);
        
    }else{
       
        //delete from the state
      state.likes.deleteLikes(currentId);
        
        //toggle the button
         likeView.toggleLikeBtn(false);
        //update in the UI
        likeView.deleteLike(currentId);
    
    }
    
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    
}

//restoring the likes when the page is reloaded

window.addEventListener('load', () => {
    
    state.likes= new Likes();
    state.likes.readStorage();
    
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likeView.renderLikes(like));
    
});

elements.shopping.addEventListener('click', el =>{
    
     const id = el.target.closest('.shopping__item').dataset.itemid;
    
    if(el.target.matches('.shopping__delete , .shopping__delete *')){
        
        state.list.deleteItem(id);
        listView.deleteItem(id);
        
    }else if(el.target.matches('.shopping__count-value')){
        
        const val = parseFloat(el.target.value);
        state.list.updateCount(id, val);
    }
});

elements.recipe.addEventListener('click', el =>{
    
   if(el.target.matches('.btn-decrease, .btn-decrease *')){
     
      if(state.recipe.serving > 1){
       
        state.recipe.updateServings('dec');
        recipeView.updateServingView(state.recipe);
      }
     
   } else if(el.target.matches('.btn-increase, .btn-increase *')){
    
    state.recipe.updateServings('inc');
    recipeView.updateServingView(state.recipe);
       
     }else if(el.target.matches('.recipe__btn--add , .recipe__btn--add *')){
         
         controlList();
         
     }else if(el.target.matches('.recipe__love, .recipe__love *')){
         
         controlLike();
         
     }
    
});

window.l = new List();














