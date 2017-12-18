import React, { Component } from 'react';

import AdminCategories from '../categories/AdminCategories';

function getCategories() {
    dbData.on('value', snap => {
        const items = [];
        snap.forEach( childSnap => {
            items.push({ key: childSnap.key, label: childSnap.val().category, value:childSnap.key});
        });
        this.setState({
            categories : items
        });
    });
}
