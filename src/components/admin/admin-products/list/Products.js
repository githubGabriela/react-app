// Usage:
// <Products/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import CreateEdit from '../crud/CreateEdit';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';
import Item from '../crud/Item';
import RemovePopup from '../../common/RemovePopup';
import Settings from '../../../common/Settings';

import '../../../../assets/css/General.css';

class Products extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            products: [],
            initialProducts: [],
            checkedItems: [],
            checkAll : false,
            showRemovePopup: false,
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
                showRemovePopup : true,
            });
        }  
    
        hideRemovePopup() {
            this.setState({
                showRemovePopup : false
            });
        }
    
        setItemsForPopup(){
            this.setState({
                checkedItems: this.state.checkedItems
            });
        }
        
        resetCheckboxes() {
            this.setState({ 
                checkedItems: [],
                checkedItems: [],
                checkAll: false
            });
        }

        toggleSettingsFields(){
            let toggle = !this.state.showSettingsFields;
            this.setState({
                showSettingsFields: toggle
            });
        }

        removeConfirmed() {
            DataSource.removeProducts(this.state.checkedItems); 
            this.hideRemovePopup();
            this.resetCheckboxes();
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
                                            <Item isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                             showSettingsFields={this.state.showSettingsFields}
                                                             checkedItem={(checked, item) => Utils.toggleItems(this.state.products, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        </div>
                                        <div className="center-from-top flex space-between">
                                            <div className="edit-cart-icons">
                                                <CreateEdit type={Constants.UTILS.EDIT} popupTitle={Constants.TITLES.EDIT} 
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
                            checked={this.state.checkAll}
                            onChange={(event)=> { Utils.toggleAll(this.state.products, event.target.checked, result => this.setState(result))}}/> 
                    : null
                    }
                </div>
            );
        }
        
        let showRemoveIcon= () => {
            return (
                <div>
                    { (this.state.checkAll || this.state.checkedItems.length > 0) ? 
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
                            <CreateEdit type={Constants.UTILS.CREATE} popupTitle={Constants.TITLES.CREATE}/>
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
                    <RemovePopup
                        popupType={Constants.TITLES.PRODUCTS}
                        items={this.state.checkedItems}
                        showRemovePopup={this.state.showRemovePopup}
                        confirmed={this.removeConfirmed}
                        canceled={this.hideRemovePopup}
                    />
            </div>
        );
    }
}

export default Products;
