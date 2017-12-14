import React from 'react';
import { Route, Link } from 'react-router-dom';

import  AdminCategories  from '../categories/AdminCategories';
import  AdminProducts  from '../products/AdminProducts';


const AdminTabs = () => (
    <div>
        <ul>
            <li><Link to="/Admin/Categories">Categories</Link></li>
            <li><Link to="/Admin/Products">Products</Link></li>
        </ul>
        <Route path="/Admin/Products" component={AdminWithProducts}/>
        <Route path="/Admin/Categories" component={AdminWithCategories}/>
    </div>
)


const AdminWithProducts = ({ match }) => (
    <AdminProducts/>
)

const AdminWithCategories = ({ match }) => (
    <AdminCategories/>
)

export default AdminTabs;