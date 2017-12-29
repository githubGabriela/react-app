import { dbDataCategories, dbDataProducts } from './constants';

export function getCategories() {
    dbDataCategories.on('value', snap => {
        const items = [];
        snap.forEach( childSnap => {
            items.push({ key: childSnap.key, value: childSnap.val()});
        });
    });
}