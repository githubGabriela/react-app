
export function preventDefault(event) {
    if (event) {
        event.preventDefault();
    }
}

export function isValidValue(value) {
    return value.trim().length > 0;
}
export function toggleItems(initialItems, checkedItems, item, isChecked, customFct) {
    if (isChecked) {
        checkedItems.push(item);
    } else {
        let index = checkedItems.indexOf(item);
        if (index !== -1) {
            checkedItems.splice(index, 1);
        }
    }
    customFct({
        checkedItems: checkedItems,
        checkAll: checkedItems.length === initialItems.length ? true : false
    });

}

export function toggleAll(initialItems, isChecked, customFct) {
    customFct({
        checkedItems: isChecked ? initialItems.slice() : [],
        checkAll: isChecked ? true : false
    });
}