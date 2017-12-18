export function getComments() {
     return [
         { id: 'a', 
         value: 'a'},
         { id: 'b', 
         value: 'b'},
         { id: 'b', 
         value: 'b'}];
}

export function getBlogPost(id){
    return 'blog post';
}

export function addChangeListener(cb){
    console.log('addChangeListener');
}

export function removeChangeListener(cb){
    console.log('removeChangeListener');
}
