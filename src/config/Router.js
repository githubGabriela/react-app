import React from 'react';
import { BrowserRouter as Router,
     Route, 
     Redirect, NavLink } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import Products from '../components/products/Products';
 import ProductDetail from '../components/products/ProductDetail';
 import Admin from '../components/admin/Admin';
 import History from '../components/history/History';

 import './Router.css';

const Tabs = () => (
    <Router>
        <div>
            <ul>
            <li className="shoppingList">
                    <NavLink to="/" activeClassName="active">
                        <FontAwesome name='shopping-basket'/>
                    </NavLink>
                </li>
                <li><NavLink to="/Products" activeClassName="active"> 
                        <FontAwesome name='list'/>
                    </NavLink>
                </li>
                <li><NavLink to="/History" activeClassName="active"> 
                        <FontAwesome name='history'/>
                    </NavLink>
                </li>
                <li><NavLink to="/Admin" activeClassName="active">
                        <FontAwesome name='user-circle-o'/>
                    </NavLink>
                </li>
            </ul>

            <Route exact path="/" component={ShoppingListStack}/>
            <Route path="/Products" component={ProductsStack}/>
            <Route path="/Admin" component={AdminPage}/>
            <Route path="/History" component={HistoryItems}/>
        </div>
    </Router>
)


const ShoppingListStack = () => (
    <ShoppingList/>
 )
 
const HistoryItems = () => (
    <History/>
)

const ProductsStack = () => (
    <Products/>
)

const AdminPage = ({ match }) => (
    <Admin/>
)
 
export default Tabs;