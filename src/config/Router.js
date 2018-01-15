import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../components/header/Header';
 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import AllProducts from '../components/all-products/AllProducts';
 import ProductDetail from '../components/all-products/ProductDetail';
 import Admin from '../components/admin/Admin';
 import History from '../components/history/History';
 import Login from '../components/auth/Login';
 import CreateUser from '../components/auth/CreateUser';

 import './Router.css';

const Tabs = () => (
    <Switch>
            <Route exact path="/" component={ShoppingListStack}/>
            <Route path="/Products" component={ProductsStack}/>
            <Route path="/History" component={HistoryItems}/>
            <Route path="/Admin" component={AdminPage}/>
            <Route path="/Login" component={LoginPage}/>
            <Route path="/CreateUser" component={CreateUserPage}/>
    </Switch>
)


const ShoppingListStack = () => (
    <ShoppingList/>
 )
 
const HistoryItems = () => (
    <History/>
)

const ProductsStack = () => (
    <AllProducts/>
)

const AdminPage = ({ match }) => (
    <Admin/>
)

const LoginPage = () => (
    <Login/>
)

const CreateUserPage = () => (
    <CreateUser/>
)
 
export default Tabs;