export default class Likes{
    
    constructor(){
        
        this.likes = [];
    }
    
    addLikes(id, title, author, img){
        
        const like = {id, title, author, img};
        this.likes.push(like);
        
        //persist data in the local storage
        this.persistData();
        
        return like;
        
    }
    
    deleteLikes(id){
        
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        
        //persist data in the local storage
        this.persistData();
        
    }
    
    isLiked(id){
        
        return this.likes.findIndex(el => el.id === id) !== -1;
           
    }
    
    getNumLikes(){
        
        return this.likes.length;
    }
    
    persistData(){
        
     localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        
        const storage = localStorage.getItem('likes');
        
    //restoring the likes array
        
        if(storage){
            
            this.likes = JSON.parse(storage);
        }
    }
    
    
};