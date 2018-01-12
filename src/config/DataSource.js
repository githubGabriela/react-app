import { dbDataCategories, dbDataProducts, dbDataShoppingList, dbDataHistory, dbDataLastModified, storage } from './constants';
import * as Constants from '../utils/Constants';

//GET
function getKeyValues(snap) { // customFct - function called in the component
    const items = [];
    snap.forEach( childSnap => {
        items.push({ key: childSnap.key, value: childSnap.val()});
    });
    return items;
}

export function getCategories(customFct) { 
    dbDataCategories.on('value', snap => {
        let recentlyAdded = getKeyValues(snap).reverse();
        customFct(recentlyAdded);
    }
    );
}

export function getCategoriesNames(customFct){
    dbDataCategories.orderByChild('name').on('value', snap => {
        let items = [];
        snap.forEach(childSnap => {
            items.push(childSnap.val().name);
        });
        let recentlyAdded = items.reverse();
        customFct(recentlyAdded);
    });
}

export function getCategoriesForDropdown(customFct) {
    dbDataCategories.on('value', (snap) => {
        const items = [];
        snap.forEach( childSnap => {
            items.push({ value: childSnap.key, label: childSnap.val().name});
        });
        let recentlyAdded = items.reverse();
        customFct(recentlyAdded);
    });
}

export function getColorForCategory(categoryName, customFct){
    dbDataCategories.orderByChild('name').equalTo(categoryName).on('value', snap => {
        let color= '';
        snap.forEach( childSnap => {
            color = childSnap.val().color
        });
        customFct(color);
    });
}

export function getProducts(customFct) {
    dbDataProducts.on('value', snap => {
        let recentlyAdded = getKeyValues(snap).reverse();
        customFct(recentlyAdded);
    });
}

export function getProductsByCategory(customFct){
    dbDataProducts.orderByChild('category').on('value', snap => {
        let recentylAdded = getKeyValues(snap).reverse();
        customFct(recentylAdded);
    });
}

export function getShoppingList(customFct){
    dbDataShoppingList.orderByChild('category').on('value', snap => {
        let recentylAdded = getKeyValues(snap).reverse();
        customFct(recentylAdded);
    });
}

export function getHistory(customFct){
    dbDataHistory.orderByChild('category').on('value', snap => {
        let recentylAdded = getKeyValues(snap).reverse();
        customFct(recentylAdded);
    });
}

export function getLastModified(customFct){
    dbDataLastModified.orderByChild('lastModified').once('value', snap => {
        customFct(snap.val().lastModified);
    });
}

// PUSH
export function addCategory(category, customFct) {
    if(category && category.name) {
        dbDataCategories.orderByChild('name').equalTo(category.name).once('value', snap => {
            if(!snap.val()) {
                dbDataCategories.push(category);
                customFct({message: ''});
            } else{
                customFct({message: 'This category already exists'});
            }
        });
    }
}

export function addProduct(value, customFct){
    if(value && value.name){
        dbDataProducts.orderByChild('name').equalTo(value.name).once('value', snap => {
            let prod = snap.val();
            let keys;
            if(prod){
                keys = Object.keys(prod);
            }
            if(!prod || (prod[keys] && prod[keys].category !== value.category)) {
                dbDataProducts.push(value);
                customFct({message: ''});
            } else {
                customFct({message: 'This product already exists'});
            }               
        }); 
    }
}

export function addToShoppingList(item) {
    if(item && item.value){
        dbDataShoppingList.orderByChild('name').equalTo(item.value.name).once('value', snap=> {
            let exists = snap.val();
            if(!exists){
                dbDataShoppingList.push(item.value);
                setLastModified();
            }
        });
    }
}

function setLastModified(){
    const date= new Date();
    const month = date.getMonth() + 1;
    const today = date.getDate() + '/' + month + '/' +date.getFullYear() + ' ' 
                + date.getHours() + ':' +date.getMinutes()+ ':'+ date.getSeconds();
    dbDataLastModified.orderByChild('lastModified').once('value', snap=> {
        let exists = snap.val();
        if(!exists) {
            dbDataLastModified.push({lastModified: today});
        }else{
            dbDataLastModified.set({lastModified: today});
        }
    });
}

export function addToHistory(item){
    if(item && item.value) {
          dbDataHistory.push(item.value);
     }
}

export function saveImage(categoryName, file){
    let storageRef = storage.ref(categoryName +'/image/'+file.name);
    console.log('file.name', file.name);
    storageRef.put(file);
}

export function getImage(categoryName, fileName) {
    let storageRef = storage.ref(categoryName);
    if(storageRef.on(function(url) {
        console.log('url', url);
    }).catch(function(error) {
        console.log('error', error);
    }));
}

export function removeImage(categoryName){
    
}

// UPDATE
export function updateCategoryName(key, value, customFct){
    dbDataCategories.orderByChild('name').equalTo(value.name).once("value", snap => {
        if(!snap.val()){
            dbDataCategories.child(key).update(value);
            customFct({message: ''});
            } 
            customFct({message: 'This category already exists'});
        });
}

export function updateCategoryColor(key, value, customFct){
    dbDataCategories.orderByChild('name').once("value", snap => {
            dbDataCategories.child(key).update(value);
            customFct(value);
        });
}

export function updateProduct(key, value, customFct) {
    dbDataProducts.orderByChild('name').equalTo(value.name).once("value", snap => {
        let prod = snap.val();
        let keys;
        if(prod){
            keys = Object.keys(prod);
        }
        if(!prod || (prod[keys] && prod[keys].category !== value.category)) {
            dbDataProducts.child(key).update(value);
            customFct({message: ''});
        } else {
            customFct({message: 'This product already exists'});
        }
    });
}


// REMOVE
export function removeCategories(items){
    items.forEach( item => {
        if(item.key){
            dbDataCategories.child(item.key).remove();
        }
    })
}

export function removeProducts(items){
    items.forEach( item => {
        if(item.key){
            dbDataProducts.child(item.key).remove();
        }
    })
}

export function removeFromShoppingList(item){
    if(item && item.key) {
       dbDataShoppingList.child(item.key).remove();
    }
}

export function clearHistory(items){
    items.forEach( item => {
        dbDataHistory.child(item.key).remove();
    });
}

export function clearShoppingList(items){
    items.forEach( item => {
        addToHistory(item);
        dbDataShoppingList.child(item.key).remove();
    });
}

// filtering & sorting
export function orderAndFilter(type, value, customFct) {
    switch(type) {
        case Constants.CATEGORIES:
            orderFilterByName(dbDataCategories, value, customFct);
            break;
        case Constants.PRODUCTS:
            orderFilterByName(dbDataProducts, value, customFct);
        break;
        case Constants.SHOPPING_LIST:
            orderFilterByName(dbDataShoppingList, value, customFct);
        break;
        case Constants.HISTORY:
            orderFilterByName(dbDataHistory, value, customFct);
        break;
        default:
        break;
    }
}

export function orderFilterByName(dbDataType, value, customFct) {
    if(value){
        dbDataType.orderByChild('name').startAt(value).on("value", snap => {
            let items = getKeyValues(snap);
            customFct(items);
        });
    }else{
        dbDataType.orderByChild('name').on("value", snap => {
            let items = getKeyValues(snap);
            customFct(items);
        });
    }
}
