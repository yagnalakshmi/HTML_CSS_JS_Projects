import axios from 'axios';
import {key, proxy} from '../config.js';

export default class Recipe{
    
    constructor(id){
        
        this.id = id;
    }
    
    async getRecipe(){
        
        try{
            
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            this.ingLength = res.data.recipe.ingredients.length;
            
            
        }
        catch(error){
            
            console.log(error);
        }
    }
    
    cookingTime(){
        
         
        
        const periods =  Math.ceil(this.ingLength / 3);
        
        this.time = (periods * 15) ;
        
     }

    numOfServing(){
        
        this.serving = 4;
    }
    
    parseIngredients(){
        
        const bigUnit = [ 'tablespoons', 'tablespoon', 'teaspoons', 'teaspoon','ounces', 'ounce', 'cups', 'pounds' ];
        const smallUnit = ['tbsp', 'tbsp', 'tsp', 'tsp','oz', 'oz', 'cup', 'pound' ];
        const units = [...smallUnit, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(el => {
            
            //uniform units
            
            let ingredient = el.toLowerCase();
            bigUnit.forEach((unit, i) => {
                
                ingredient = ingredient.replace(unit, smallUnit[i]);
            });
            
            
            //remove parenthesis
            
              ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            //parse ingredients to count unit and ingredient
            const arrIng = ingredient.split(' ');
            
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            
            let objIng;
            if(unitIndex > -1){
                
                //there is a unit
               const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1){
                     
                    count = eval( arrIng[0].replace('-' , '+'));
                         
                }else{
                         
                    count = eval(arrIng.slice(0, unitIndex).join('+'));     
                }
                
                objIng = {
                    
                    count,
                    unit : arrIng[unitIndex],
                    ingredient : arrIng.slice(unitIndex + 1).join(' ')
                }
                
            }else if(parseInt(arrIng[0], 10)){
                
                //there is no UNIT but a number
                objIng ={
                        count: parseInt(arrIng[0], 10),
                        unit:'',
                        ingredient: arrIng.slice(1).join(' ')
                        };
                           
            }else if(unitIndex === -1){
                
                //there is no  UNIT and no number
                    
                    objIng = {
                        
                        count: 1,
                        unit: '',
                        ingredient
                    };
                
            }
            
            
            return objIng;
        });
        
        this.ingredients = newIngredients;
    }
    
    
    updateServings(type){
        
       
        const newServings = type === 'dec' ? this.serving - 1 : this.serving + 1;
        
        this.ingredients.forEach( ing => {
            
            ing.count *= (newServings / this.serving);
        });
        
        this.serving = newServings;
        
    }
} 


