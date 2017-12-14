import React from 'react';
import { BrowserRouter as Router,
     Route, 
     Redirect, NavLink } from 'react-router-dom';

 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import Products from '../components/products/Products';
 import ProductDetail from '../components/products/ProductDetail';
 import Admin from '../components/admin/Admin';

 import './Router.css';

const Tabs = () => (
    <Router>
        <div>
            <ul>
                <li><NavLink to="/" activeClassName="active">Shopping List</NavLink></li>
                <li><NavLink to="/ProductsStack" activeClassName="active">Products</NavLink></li>
                <li><NavLink to="/Admin" activeClassName="active">Admin</NavLink></li>
            </ul>

            <Route exact path="/" component={ShoppingListStack}/>
            <Route path="/ProductsStack" component={ProductsStack}/>
            <Route path="/Admin" component={AdminPage}/>
        </div>
    </Router>
)

const ShoppingListStack = () => (
   <ShoppingList/>
)

const ProductsStack = () => (
    <Products/>
)

const AdminPage = ({ match }) => (
    <Admin/>
)

export default Tabs;