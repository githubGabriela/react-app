// Usage:
// <AdminProducts/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import ProductCreateEdit from '../crud/ProductCreateEdit';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';
import ProductItemInfo from '../crud/ProductItemInfo';
import RemoveProducts from '../crud/RemoveProducts';
import Settings from '../../../common/Settings';

import '../../../../assets/css/General.css';

class AdminProducts extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            products: [],
            initialProducts: [],
            checkedItems: [],
            allIsChecked : false,
            itemsForRemovePopup: [],
            removePopupOpened: false,
            showSettingsFields: true
        }
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

     getCategories() {
            DataSource.getCategories( items => {
                this.setState({
                    categories : items
                });
            });
        }

        getProducts() {
            DataSource.getProducts( items => {
                this.setState({
                    products : items,
                    initialProducts: items
                });
            });
        }
        shouldComponentUpdate(nextProps) {
            return true;
        }
        
        openRemovePopup() {
            this.setState({
                removePopupOpened : true,
            });
        }  
    
        closeRemovePopup() {
            this.setState({
                removePopupOpened : false
            });
        }
    
        setItemsForPopup(){
            this.setState({
                itemsForRemovePopup: this.state.checkedItems
            });
        }
        
        setInitialStateCheckboxes() {
            this.setState({ 
                checkedItems: [],
                itemsForRemovePopup: [],
                allIsChecked: false
            });
        }

        toggleSettingsFields(){
            let toggle = !this.state.showSettingsFields;
            this.setState({
                showSettingsFields: toggle
            });
        }

       

    render() {
        let showCart = (item) => {
            return (
                <div className="space-right">
                    <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => {Utils.preventDefault(event); DataSource.addToShoppingList(item)}}/>
                </div>
            );
        }

        let showAllItems = () => {
            return (
                <div>         
                    {
                        this.state.products.map((item) => {
                            return <div className="section-item" key={item.key}>
                                        <div className="flex space-between"> 
                                        <div>
                                            <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                             showSettingsFields={this.state.showSettingsFields}
                                                             checkedItem={(checked, item) => Utils.toggleSelectedItems(this.state.products, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        </div>
                                        <div className="center-from-top flex space-between">
                                            <div className="edit-cart-icons">
                                                <ProductCreateEdit type={Constants.UTILS.EDIT} popupTitle={Constants.TITLES.EDIT} 
                                                               item={item}
                                                               showSettingsFields={this.state.showSettingsFields}/>
                                            </div>
                                            <div>
                                                {showCart(item)}
                                            </div>
                                        </div>
                                        </div>
                            </div>
                        })
                    }
             </div>
            )
        }

        let showCheckAll = () => {
            return (
                <div>
                    { this.state.showSettingsFields ? 
                        <input type="checkbox" value="allChecked" 
                            checked={this.state.allIsChecked}
                            onChange={(event)=> { Utils.toggleAllItems(this.state.products, event.target.checked, result => this.setState(result))}}/> 
                    : null
                    }
                </div>
            );
        }
        
        let showRemoveIcon= () => {
            return (
                <div>
                    { (this.state.allIsChecked || this.state.checkedItems.length > 0) ? 
                        <FontAwesome name="close" onClick={(item) => { this.openRemovePopup(); this.setItemsForPopup()}}/>
                    : null
                    }
                </div>
            );
        }

        let showFilteringSorting = () => {
            return (
                <div>
                    { this.state.showSettingsFields ? 
                        <FilteringAndSorting showComponent={this.state.products.length > 0} 
                            dataType={Constants.PRODUCTS}
                            items={this.state.products} 
                            initialItems = {this.state.initialProducts}
                            setFilteredItems = {items => this.setState({products: items})}/>
                    : null
                    }
                </div>
            )
        }
        
        let showCreateButton = () => {
            return (
                <div>
                     { this.state.showSettingsFields ? 
                        <div className="create-input align-left">
                            <ProductCreateEdit type={Constants.UTILS.CREATE} popupTitle={Constants.TITLES.CREATE}/>
                        </div>  
                    : null
                    }
               </div>  
            );
        }

        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title"> 
                        <div className="align-right">
                            <Settings toggleSettings={(event) => this.toggleSettingsFields(event)}/>
                        </div>
                            {Constants.TITLES.PRODUCTS}
                            {showCreateButton()}
                           
                            {showFilteringSorting()}
                        <div className="flex space-between center-margin-from-top">
                            {showCheckAll()}
                            {showRemoveIcon()}
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <div>
                    {showHeader()}
                    {showAllItems()}
                    <RemoveProducts removePopupOpened={this.state.removePopupOpened} 
                                items={this.state.itemsForRemovePopup}
                                confirmRemoveItems = {() => { 
                                                        DataSource.removeProducts(this.state.itemsForRemovePopup); 
                                                        this.closeRemovePopup();
                                                        this.setInitialStateCheckboxes()}
                                                    }
                                closeRemovePopup={()=> this.closeRemovePopup()}/> 
            </div>
        );
    }
}

export default AdminProducts;
