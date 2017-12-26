import React from 'react';
import { Route, Link } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

import  AdminCategories  from '../admin/admin-categories/list/AdminCategories';
import  AdminProducts  from '../admin/admin-products/list/AdminProducts';


const AdminTabs = () => (
    <div>
        <ul>
            <li><Link to="/Admin/Categories">
                  <FontAwesome name='copyright'/>  
                </Link>
            </li>
            <li><Link to="/Admin/Products">
                    <FontAwesome name='product-hunt'/>
                </Link>
            </li> 
        </ul>
        <Route path="/Admin/Categories" component={AdminWithCategories}/>
        <Route path="/Admin/Products" component={AdminWithProducts}/>
    </div>
)


const AdminWithProducts = ({ match }) => (
    <AdminProducts/>
)

const AdminWithCategories = ({ match }) => (
    <AdminCategories/>
)

export default AdminTabs;