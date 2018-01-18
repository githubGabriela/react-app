import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import AllProducts from '../components/all-products/AllProducts';
 import AdminRouter from '../components/admin/common/AdminRouter';
 
 import AdminCategories from '../components/admin/admin-categories/list/AdminCategories';
 import AdminProducts from '../components/admin/admin-products/list/AdminProducts';
 import History from '../components/history/History';
 import Login from '../components/auth/Login';
 import CreateUser from '../components/auth/CreateUser';

 import './Router.css';

 class AppRouter extends Component {
     render() {
         return (
            <div> 
                { this.props.userAuthenticated ? 
                   <Switch>
                        <Route exact path="/" component={ShoppingListStack}/>
                        <Route path="/Products" component={ProductsStack}/>
                        <Route path="/History" component={HistoryItems}/>
                        <Route path="/Admin" component={AdminStack}/>           
                        {/* <Route exact path="*" component={ShoppingListStack}/> */}
                    </Switch>
                    : 
                    <Switch>
                        <Route exact path="/" component={LoginStack}/>
                        <Route path="/Login" component={LoginStack}/>
                        <Route path="/CreateUser" component={CreateUserStack}/>
                        <Route exact path="*" component={LoginStack}/>
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

const LoginStack = () => (
    <Login/>
)

const CreateUserStack = () => (
    <CreateUser/>
)
const AdminStack = ({ match }) => (
    <AdminRouter/>
)

export default AppRouter;