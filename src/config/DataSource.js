import { dbDataCategories, dbDataProducts, dbDataShoppingList, dbDataHistory } from './constants';

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

// filtering & sorting
export function order(type, customFct) {
    switch(type) {
        case 'categories':
            orderByName(dbDataCategories, customFct);
            break;
        case 'products':
            orderByName(dbDataProducts, customFct);
        break;
        case 'shoppingList':
            orderByName(dbDataShoppingList, customFct);
        break;
        case 'history':
            orderByName(dbDataHistory, customFct);
        break;
        default:
        break;
    }
}

export function orderByName(dbDataType, customFct){
    dbDataType.orderByChild('name').on("value", snap => {
        customFct(getKeyValues(snap));
    });
}