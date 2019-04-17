import {elements} from './base.js';

export const getInput = () => elements.searchInput.value;
    


export const clearField = () => {
    
    elements.searchInput.value = '';
}

export const clearResult = () => {
    
    elements.searchResList.innerHTML = '';
    elements.searchResPage.innerHTML ='';
}

export const highlightRecipe = id =>{
    
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        
        el.classList.remove('results__link--active')
    })
    
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

const renderRecipe = recipe =>{
    
    const result = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${alterRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    
    
    elements.searchResList.insertAdjacentHTML('beforeend', result);
    
    
};

export const alterRecipeTitle = (title , limit = 17) => {
    
    const newTitle = [];
    if(title.length > limit){
        
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                
                newTitle.push(cur);
            }
            return acc + cur.length;
        } , 0);
        
        return `${newTitle.join(' ')}...`
    }

return title;
};

const createButton = (page, type) =>` 
            <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
                 <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                   
            </button>

`;

const renderButton = (page, numResults, resPerPage) => {
    
    const numOfPages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && numOfPages>1){
        
       button = createButton(page, 'next');
        
    }else if(page < numOfPages){
    
        button =
        `${createButton(page, 'prev')}
        ${createButton(page, 'next')}`;
        
    }else if(page === numOfPages && numOfPages>1){
        
       button = createButton(page, 'prev');
    }
    
    elements.searchResPage.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start , end).forEach(renderRecipe);
    
    renderButton(page, recipes.length, resPerPage);
};
