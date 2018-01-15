import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import AllProducts from '../components/all-products/AllProducts';
 import ProductDetail from '../components/all-products/ProductDetail';
 import AdminCategories from '../components/admin/admin-categories/list/AdminCategories';
 import AdminProducts from '../components/admin/admin-products/list/AdminProducts';
 import History from '../components/history/History';
 import Login from '../components/auth/Login';
 import CreateUser from '../components/auth/CreateUser';

 import './Router.css';

 class AppRouter extends Component {
     render() {
        // const routeIsActive = (match, location) => {
        //     if(!match) return false;
        //     return match.path === location.pathname;
        // }
         return (
            <div> 
                { this.props.userAuthenticated ? 
                   <Switch>
                        <Route exact path="/" component={ShoppingListStack}/>
                        <Route path="/Products" component={ProductsStack}/>
                        <Route path="/History" component={HistoryItems}/>
                        <Route path="/Admin/Categories" component={AdminWithCategories}/>      
                        <Route path="/Admin/Products" component={AdminWithProducts}/>         
                        <Route exact path="*" component={ShoppingListStack}/>
                    </Switch>
                    : 
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <Route path="/Login" component={LoginPage}/>
                        <Route path="/CreateUser" component={CreateUserPage}/>
                        <Route exact path="*" component={LoginPage}/>
                   </Switch>
                }
        </div>
         )
     }
 }

const ShoppingListStack = () => (
    <ShoppingList/>
 )
 
const HistoryItems = () => (
    <History/>
)

const ProductsStack = () => (
    <AllProducts/>
)

const LoginPage = () => (
    <Login/>
)

const CreateUserPage = () => (
    <CreateUser/>
)
const AdminWithProducts = ({ match }) => (
    <AdminProducts/>
)

const AdminWithCategories = ({ match }) => (
    <AdminCategories/>
)

export default AppRouter;