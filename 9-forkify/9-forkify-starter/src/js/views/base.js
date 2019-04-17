export const elements = {
    
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchResult:document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPage: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likes: document.querySelector('.likes__list'),
    likesMenu: document.querySelector('.likes__field')
}

export const elementString = {
    
    loader: 'loader'
}

export const renderLoader = parent => {
    
    const loader = `<div class = "${elementString.loader}">
                      <svg>
                        <use href="img/icons.svg#icon-cw"></use>
                      </svg>
                     </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    
    const loader = document.querySelector(`.${elementString.loader}`);
   if(loader) loader.parentElement.removeChild(loader);
}