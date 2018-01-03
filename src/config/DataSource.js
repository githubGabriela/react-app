import { dbDataCategories, dbDataProducts, dbDataShoppingList, dbDataHistory } from './constants';
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

// PUSH
export function addCategory(category, customFct) {
    if(category && category.name) {
        dbDataCategories.orderByChild('name').equalTo(category.name).once('value', snap => {
            if(!snap.val()) {
                dbDataCategories.push(category);
            } 
            customFct(snap.val());
        });
    }
}

export function addProduct(product, customFct){
    if(product && product.name){
        dbDataProducts.orderByChild('name').equalTo(product.name).once('value', snap => {
            if(!snap.val()) {
                dbDataProducts.push(product);
            }
            customFct(snap.val());
        });
    } 
}

export function addToShoppingList(item){
    if(item && item.value){
        dbDataShoppingList.orderByChild('name').equalTo(item.value.name).once('value', snap=> {
            let exists = snap.val();
            if(!exists){
                dbDataShoppingList.push(item.value);
            }
        });
    }
}

export function addToHistory(item){
    if(item && item.value) {
          dbDataHistory.push(item.value);
     }
}


// UPDATE
export function update(dbDataType, key, value, customFct){
    switch(dbDataType){
        case Constants.PRODUCTS:
            updateForDbType(dbDataProducts, key, value, customFct);
        break;
        case Constants.CATEGORIES:
            updateForDbType(dbDataCategories, key, value, customFct);
        break;
        default:
            updateForDbType(dbDataType, key, value, customFct);
        break;
    }
}

export function updateForDbType(dbType, key, value, customFct) {
    dbType.orderByChild('name').equalTo(value).on("value", snap => {
        console.log('update item exists - ', snap.val());
        if(!snap.val()){
            dbType.child(key).update(value);
        } 
        customFct(snap.val());
    });
}


// REMOVE
export function removeFromDb(items, dbDataType){
    items.forEach( item => {
        if(item.key){
            dbDataType.child(item.key).remove();
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
