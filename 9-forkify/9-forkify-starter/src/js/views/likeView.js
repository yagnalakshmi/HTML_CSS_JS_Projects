import { elements } from './base.js';
import {alterRecipeTitle} from './searchView.js'


export const toggleLikeBtn = isLiked =>{
    
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href' , `img/icons.svg#${iconString}`);
};


export const toggleLikeMenu = numLikes => {
    
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLikes = like =>{
    
    const markUp = `

            <li>
              <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                     <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${alterRecipeTitle(like.title)}</h4>
                     <p class="likes__author">${like.author}</p>
                </div>
              </a>
            </li>

`;
    
    elements.likes.insertAdjacentHTML('beforeend', markUp);
};

export const deleteLike = id =>{
    
     const like = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(like) like.parentElement.removeChild(like);
}
