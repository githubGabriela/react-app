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
import RemovePopup from '../../../popups/RemovePopup';

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
            removePopupOpened: false
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
    


    render() {
        let showAllItems = () => {
            return (
                <div>         
                    {
                        this.state.products.map((item) => {
                            return <div className="section-item" key={item.key}>
                                        <div className="flex space-between"> 
                                            <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                            checkedItem={(checked, item) => Utils.toggleSelectedItems(this.state.products, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                            <ProductCreateEdit type={Constants.UTILS.EDIT} popupTitle={Constants.TITLES.EDIT} item={item}/>
                                            <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => {Utils.preventDefault(event); DataSource.addToShoppingList(item)}}/>
                                        </div>
                            </div>
                        })
                    }
             </div>
            )
        }

        let showCheckAll = () => {
            return (
                <input type="checkbox" value="allChecked" 
                    checked={this.state.allIsChecked}
                    onChange={(event)=> { Utils.toggleAllItems(this.state.products, event.target.checked, result => this.setState(result))}}/> 
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
                <FilteringAndSorting showComponent={this.state.products.length > 0} 
                    dataType={Constants.PRODUCTS}
                    items={this.state.products} 
                    initialItems = {this.state.initialProducts}
                    setFilteredItems = {items => this.setState({products: items})}/>
            )
        }
        
        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title"> 
                            {Constants.TITLES.PRODUCTS}
                            <div className="create-input align-left">
                                <ProductCreateEdit type={Constants.UTILS.CREATE} popupTitle={Constants.TITLES.CREATE}/>
                            </div>
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
                <div className="create-input">
                    {showHeader()}
                    {showAllItems()}
                    <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                                items={this.state.itemsForRemovePopup}
                                confirmRemoveItems = {() => { 
                                                        DataSource.removeProducts(this.state.itemsForRemovePopup); 
                                                        this.closeRemovePopup();
                                                        this.setInitialStateCheckboxes()}
                                                    }
                                closeRemovePopup={()=> this.closeRemovePopup()}/> 
                </div>
            </div>
        );
    }
}

export default AdminProducts;
