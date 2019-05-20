import { dataCategoriesByKey, dataCategoriesByName,
     dataProducts, dataShoppingBasket, dataHistory,
     dataLastModified, storage,
     dataProductsByCategory
    } from './constants';
import * as Constants from '../utils/Constants';

//GET
function getKeyValues(snap) { // customFct - function called in the component
    const items = [];
    snap.forEach( childSnap => {
        items.push({ key: childSnap.key, value: childSnap.val()});
    });
    return items;
}

// GOOD function
export function getCategories(customFct) { 
    dataCategoriesByKey.on('value', snap => {
        let items = getKeyValues(snap);
        customFct(items);
    }
    );
}

export function getOrderProductsByCategory(customFct) {
    dataProductsByCategory.on('value', snap => {
            let items = getKeyValues(snap);
            console.log('testProducts', items);
            customFct(items);
    });
}

export function getTestHistory(customFct) {
    dataHistory.on('value', snap => {
            let items = getKeyValues(snap);
            console.log('testHistory', items);
            customFct(items);
    });
}

export function getTestLastModified(customFct) {
    dataLastModified.on('value', snap => {
            let items = getKeyValues(snap);
            console.log('lastModified', items);
            customFct(items);
    });
}

export function getTestShoppingBasket(customFct) {
    dataShoppingBasket.on('value', snap => {
            let items = getKeyValues(snap);
            console.log('testshoppingBasket', items);
            customFct(items);
    });
}


export function getCategoriesNames(customFct){
    // dataCategoriesByKey.orderByChild('name').on('value', snap => {
    //     let items = [];
    //     snap.forEach(childSnap => {
    //         items.push(childSnap.val().name);
    //     });
    //     let recentlyAdded = items;
    //     customFct(recentlyAdded);
    // });
}

export function getCategoriesForDropdown(customFct) {
    dataCategoriesByKey.on('value', (snap) => {
        const items = [];
        snap.forEach( childSnap => {
            items.push({ value: childSnap.key, label: childSnap.val().name});
        });
        let recentlyAdded = items;
        customFct(recentlyAdded);
    });
}

export function getColorForCategory(categoryName, customFct){
    dataCategoriesByKey.orderByChild('name').equalTo(categoryName).on('value', snap => {
        let color= '';
        snap.forEach( childSnap => {
            color = childSnap.val().color
        });
        customFct(color);
    });
}

export function getProducts(customFct) {
    dataProducts.on('value', snap => {
        let recentlyAdded = getKeyValues(snap);
        customFct(recentlyAdded);
    });
}

export function getProductsByCategory(categoryName, customFct){
    dataProducts.orderByChild('category').equalTo(categoryName).on('value', snap => {
        let recentylAdded = getKeyValues(snap);
        customFct(recentylAdded);
    });
}

export function getShoppingList(customFct){
    dataShoppingBasket.orderByChild('category').on('value', snap => {
        let recentylAdded = getKeyValues(snap);
        customFct(recentylAdded);
    });
}

export function getHistory(customFct){
    dataHistory.orderByChild('category').on('value', snap => {
        let recentylAdded = getKeyValues(snap);
        customFct(recentylAdded);
    });
}

export function getLastModified(customFct){
    dataLastModified.orderByChild('lastModified').once('value', snap => {
        customFct(snap.val().lastModified);
    });
}

// PUSH
export function createCategory(category, customFct) {
    if(category && category.name) {
        dataCategoriesByName.equalTo(category.name).once('value', snap => {
            if(!snap.val()) {
                dataCategoriesByKey.push(category);
                customFct({message: ''});
            } else{
                customFct({message: 'This category already exists'});
            }
        });
    }
}

export function addProduct(value, customFct){
    if(value && value.name){
        dataProducts.orderByChild('name').equalTo(value.name).once('value', snap => {
            let prod = snap.val();
            let keys;
            if(prod){
                keys = Object.keys(prod);
            }
            if(!prod || (prod[keys] && prod[keys].category !== value.category)) {
                dataProducts.push(value);
                customFct({message: ''});
            } else {
                customFct({message: 'This product already exists'});
            }               
        }); 
    }
}

export function addToShoppingList(item) {
    if(item && item.value){
        dataShoppingBasket.orderByChild('name').equalTo(item.value.name).once('value', snap=> {
            let exists = snap.val();
            if(!exists){
                dataShoppingBasket.push(item.value);
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
    dataLastModified.orderByChild('lastModified').once('value', snap=> {
        let exists = snap.val();
        if(!exists) {
            dataLastModified.push({lastModified: today});
        }else{
            dataLastModified.set({lastModified: today});
        }
    });
}

export function addToHistory(item){
    if(item && item.value) {
          dataHistory.push(item.value);
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
    dataCategoriesByKey.orderByChild('name').equalTo(value.name).once("value", snap => {
        if(!snap.val()){
            updateOldNames(key, value);
            dataCategoriesByKey.child(key).update(value);
            customFct({message: ''});
            } 
            customFct({message: 'This category already exists'});
        });
}

function updateOldNames(key, value) {
    dataCategoriesByKey.child(key).once("value", snap => {
        let valToUpdate = {category: value.name};
        updateValuesForProducts(snap.val().name, valToUpdate);
    });
}

export function updateCategoryColor(key, value, customFct){
    dataCategoriesByKey.orderByChild('name').once("value", snap => {
            dataCategoriesByKey.child(key).update(value);
            let catName = snap.val()[key].name;
            let valToUpdate = {color : value.color};
            updateValuesForProducts(catName, valToUpdate);
            customFct(value.color);
        });
}

function updateValuesForProducts(catName, valueToUpdate) {
    dataProducts.orderByChild("category").equalTo(catName).once("value", snap => {
        let keys = Object.keys(snap.val());
        keys.forEach( key => {
            dataProducts.child(key).update(valueToUpdate);
          });
        });
}


export function updateProduct(key, value, customFct) {
    dataProducts.orderByChild('name').equalTo(value.name).once("value", snap => {
        let prod = snap.val();
        let keys;
        if(prod){
            keys = Object.keys(prod);
        }
        if(!prod || (prod[keys] && prod[keys].category !== value.category)) {
            dataProducts.child(key).update(value);
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
            dataCategoriesByKey.child(item.key).remove();
        }
    })
}

export function removeProducts(items){
    items.forEach( item => {
        if(item.key){
            dataProducts.child(item.key).remove();
        }
    })
}

export function removeFromShoppingList(item){
    if(item && item.key) {
        dataShoppingBasket.child(item.key).remove();
    }
}

export function clearHistory(items){
    items.forEach( item => {
        dataHistory.child(item.key).remove();
    });
}

export function clearShoppingList(items){
    items.forEach( item => {
        addToHistory(item);
        dataShoppingBasket.child(item.key).remove();
    });
}

// filtering & sorting
export function orderAndFilter(type, value, customFct) {
    switch(type) {
        case Constants.CATEGORIES:
            orderFilterByName(dataCategoriesByKey, value, customFct);
            break;
        case Constants.PRODUCTS:
            orderFilterByName(dataProducts, value, customFct);
        break;
        case Constants.SHOPPING_BASKET:
            orderFilterByName(dataShoppingBasket, value, customFct);
        break;
        case Constants.HISTORY:
            orderFilterByName(dataHistory, value, customFct);
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
