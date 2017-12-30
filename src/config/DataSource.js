import { dbDataCategories, dbDataProducts, dbDataShoppingList, dbDataHistory } from './constants';

//GET
function getKeyValues(snap, customFct) { // customFct - function called in the component
    const items = [];
    snap.forEach( childSnap => {
        items.push({ key: childSnap.key, value: childSnap.val()});
    });
    customFct(items);
}

export function getCategories(customFct) { 
    dbDataCategories.on('value', snap => getKeyValues(snap, customFct));
}

export function getCategoriesNames(customFct){
    dbDataCategories.orderByChild('name').on('value', snap => {
        let items = [];
        snap.forEach(childSnap => {
            items.push(childSnap.val().name);
        });
        customFct(items);
    });
}

export function getCategoriesForDropdown(customFct) {
    dbDataCategories.on('value', (snap) => {
        const items = [];
        snap.forEach( childSnap => {
            items.push({ value: childSnap.key, label: childSnap.val().name});
        });
        customFct(items);
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
    dbDataProducts.on('value', snap => getKeyValues(snap, customFct));
}

export function getProductsByCategory(customFct){
    dbDataProducts.orderByChild('category').on('value', snap => getKeyValues(snap, customFct));
}

export function getShoppingList(customFct){
    dbDataShoppingList.orderByChild('category').on('value', snap => getKeyValues(snap, customFct));
}

export function getHistory(customFct){
    dbDataHistory.orderByChild('category').on('value', snap => getKeyValues(snap, customFct));
}

// PUSH
export function addCategory(category) {
    if(category && category.name){
        dbDataCategories.push(category);
    }
}

export function addProduct(product){
    if(product && product.name){
        dbDataProducts.push(product);
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
export function update(dbDataType, key, value){
    dbDataType.child(key).update(value);
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