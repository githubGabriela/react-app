import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import FontAwesome from  'react-fontawesome';

import AdminProducts from '../admin-products/list/AdminProducts';
import AdminCategories from '../admin-categories/list/AdminCategories';

class AdminRouter extends Component {
    render() {
        return (
            <div>
                <ul className="links">
                    <li><NavLink to="/Admin/Categories" activeClassName="selected">
                        <div className="link">
                            <FontAwesome name='copyright'/>  
                        </div>
                        </NavLink>
                    </li>
                    <li><NavLink to="/Admin/Products" activeClassName="selected">
                        <div className="link">
                            <FontAwesome name='product-hunt'/>
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
    <AdminProducts/>
)

const AdminWithCategories = () => (
    <AdminCategories/>
)


export default AdminRouter;