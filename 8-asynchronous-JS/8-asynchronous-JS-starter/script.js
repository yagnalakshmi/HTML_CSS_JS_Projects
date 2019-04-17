/*
        const first = () => {
            
            console.log(`First call`);
            second();
            console.log('Exit');
        }
        
        const second = () =>{
            
            console.log(`second call`);
            setTimeout(() => {
                console.log('In timeout function')}, 2000);
        }
   
        first();
        

function getRecipe()
{
    
    const recipeID = [200, 387, 985, 673];
    setTimeout(() => {
        
        console.log(recipeID);
        setTimeout(id => {
              
         const recipe= {title: 'pasta',
            publisher:'Yagna'};
         console.log(`${recipeID[1]} Title :${recipe.title}, publisher : ${recipe.publisher}`);  
            setTimeout(publisher => {
                
                const recipe2 = {
                    title : 'pizzza',
                    publisher: 'lakshmi'
                };
                console.log(recipe2);
            },1500, recipe.publisher);
        }, 2000, recipeID[1]);
        
    },1550);
    
}

getRecipe();




const getIDs = new Promise((resolve,reject) =>{
    
    setTimeout(() =>{
    
        resolve([200, 387, 985, 673]);
    },1500);
});

const getRecipe = recID =>{
    
    return new Promise((resolve,reject) => {
        
        setTimeout( ID => {
            
            const recipe= {title: 'pasta',
            publisher:'Yagna'};
           resolve(recipe);  
            
        },1500,  recID);
        
    });
};

const getRelated = publisher =>{
    
    return new Promise((resolve, reject) =>{
      
        setTimeout(pub =>{
           
            const recipe = {
                    title : 'pizzza',
                    publisher: 'Yagna'
                };
                resolve(recipe);
        }, 1500, publisher);
    });
};

getIDs
.then( IDs => {
    
    console.log(IDs);
    return getRecipe(IDs[1]);
})
.then (recipes => {
    
    console.log(recipes);
    return getRelated(recipes.publisher);
})
.then(relate =>{
    
    console.log(relate);
})
.catch(() =>{
    
    console.log('Error');
});

async function getRecipeAW() {
    
    const IDs = await getIDs;
    console.log(IDs);
    
    const recipe = await getRecipe(IDs[1]);
    console.log(recipe);
    
    const relate = await getRelated(recipe.publisher);
    console.log(relate);
    
    return relate;
}

const result = getRecipeAW().then(result => console.log(`Result is : ${result.title}`));

console.log(result);


*/
//ES 2015

function getWeather(woeid){

fetch(`http://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`)
.then(result => {
    
    return result.json();
})
.then(data => {
    
    const today = data.consolidated_weather[0];
    console.log(`Weather in ${data.title} is ${today.weather_state_name}. Temperature is between ${today.min_temp} and ${today.max_temp}.`);
    
})

.catch(error => console.log(error));


}

getWeather(2487956);
getWeather(44418)


//ES 2017

async function getWeather(woeid){
    
    
    const result = await fetch(`http://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`);
    const data = await result.json();
    const today = data.consolidated_weather[0];
    console.log(`Weather in ${data.title} is ${today.weather_state_name}. Temperature is between ${today.min_temp} and ${today.max_temp}.`);
    return today;
    
}

let dataSan;
getWeather(2487956)
.then(data => 
      {dataSan = data;
       console.log(dataSan)});
getWeather(44418);





























































