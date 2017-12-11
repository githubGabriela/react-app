import React from 'react';
import { BrowserRouter as Router,
     Route, 
     Redirect, 
     Link } from 'react-router-dom';

 import ShoppingList  from '../components/shoppingList/ShoppingList';
 import Products from '../components/products/Products';
 import ProductDetail from '../components/products/ProductDetail';
 import Admin from '../components/admin/Admin';

const Tabs = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Shopping List</Link></li>
                <li><Link to="/ProductsStack">Products</Link></li>
                <li><Link to="/Admin">Admin</Link></li>
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

// export const ProductsStack = StackNavigator({
//     Products: {
//         screen: Products
//     } ,
//     ProductDetail : {
//         screen: ProductDetail
//     }
// });


// export const ShoppingListStack = StackNavigator({
//     ShoppingList: {
//         screen: ShoppingList
//     } ,
//     ProductDetail : {
//         screen: ProductDetail
//     }
// });


// export const Tabs = TabNavigator({
//     ShoppingList: {
//         screen: ShoppingListStack,
//         navigationOptions: {
//             tabBarLabel: 'My List'
//         }
//     },
//     Products: {
//         screen: ProductsStack,
//         navigationOptions: {
//             tabBarLabel: 'All products'
//         }
//     },
//     Admin : {
//         screen: Admin,
//         navigationOptions: {
//             tabBarLabel: 'Admin'
//         }
//     }
// });