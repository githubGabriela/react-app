export function preventDefault(event) {
    event.preventDefault();
}

export function isValidValue(value){
    return value.trim().length > 0;
}
export function toggleSelectedItems(initialItems, checkedItems, selectedItem, checked, customFct) {
    let allIsChecked = false;
    if(checked) {
        checkedItems.push(selectedItem);
        if(checkedItems.length === initialItems.length){
            allIsChecked = true;
        }
    } else {
        let index = checkedItems.indexOf(selectedItem);
        if(index !== -1){
            checkedItems.splice(index, 1);
        }
    }
    customFct({
     checkedItems: checkedItems,
     allIsChecked: allIsChecked
 });

}

export function toggleAllItems(initialItems, checked, customFct){
    let checkedItems = [];
    let allIsChecked = false;
    if(checked) {
        initialItems.forEach( item => {
            checkedItems.push(item);
        });
        allIsChecked = true;
    } 

     customFct({
        checkedItems: checkedItems,
        allIsChecked: allIsChecked
    });
}