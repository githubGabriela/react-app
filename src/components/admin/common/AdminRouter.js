import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import FontAwesome from  'react-fontawesome';

import Products from '../admin-products/list/Products';
import Categories from '../admin-categories/list/Categories';
import * as Constants from "../../../utils/Constants";

class AdminRouter extends Component {
    render() {
        return (
            <div>
                <ul className="menu">
                    <li><NavLink to="/Admin/Categories" activeClassName="selected">
                        <div className="link">
                            <span data-tip="Categories" data-place="top">
                                <FontAwesome name='copyright'/>
                                {Constants.TITLES.CATEGORIES}
                            </span>
                        </div>
                        </NavLink>
                    </li>
                    <li><NavLink to="/Admin/Products" activeClassName="selected">
                        <div className="link">
                            <span data-tip="Products" data-place="top">
                                <FontAwesome name='product-hunt'/>
                                {Constants.TITLES.PRODUCTS}
                            </span>
                        </div>
                        </NavLink>
                    </li> 
                </ul>
                <Route path="/Admin/Categories" component={AdminWithCategories}/>      
                <Route path="/Admin/Products" component={AdminWithProducts}/>    
            </div>
        )
    }
}
const AdminWithProducts = () => (
    <Products/>
)

const AdminWithCategories = () => (
    <Categories/>
)


export default AdminRouter;