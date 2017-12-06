import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import  AdminProducts  from './AdminProducts';
import  AdminCategories  from './AdminCategories';


export const AdminTabs = TabNavigator({
    AdminProducts: {
        screen: AdminProducts,
        navigationOptions: {
            tabBarLabel: 'Products'
        }
    }, 
    AdminCategories: {
        screen: AdminCategories,
        navigationOptions: {
            tabBarLabel: 'Categories'
        }
    },
});