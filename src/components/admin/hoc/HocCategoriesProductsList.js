import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../config/DataSource';
import * as Constants from '../../../utils/Constants';
import Header from '../admin-categories-products/Header';
import NameEdit from '../admin-categories/crud/NameEdit';
import RemoveItem from '../admin-categories-products/RemoveItem';
import RemovePopup from '../../popups/RemovePopup';
import CategoryItemInfo from '../admin-categories/crud/CategoryItemInfo';
import ProductItemInfo from '../admin-products/crud/ProductItemInfo';
import ProductCreateEdit from '../admin-products/crud/ProductCreateEdit';

export function hocCategoriesProductsList (WrappedComponent, options){
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                items: [],
                headerTitle: options.headerTitle,
                dbDataType: options.dbDataType, 
                type: options.type, // categories or products
                checkedItems: [],
                allIsChecked : false,
                itemsForRemovePopup: [],
                removePopupOpened: false
            }

            this.toggleSelectedItems = this.toggleSelectedItems.bind(this);
            this.removeItemsFromDb = this.removeItemsFromDb.bind(this);
            this.closeRemovePopup = this.closeRemovePopup.bind(this);
        }

       //  checkboxes
        toggleSelectedItems(allSelected, selectedItem, checked) {
            let propsItems = this.props.items;
            let items = this.state.checkedItems;
            let allChecked = this.state.allIsChecked;

            if(allSelected && !selectedItem) {
                   items = [];
                   if(checked) {
                       propsItems.forEach( item => {
                           items.push(item);
                       });
                       allChecked = true;
                   } else {
                       allChecked = false;
               }
           } else if(selectedItem) {
                   allChecked = false;
                   if(checked) {
                       items.push(selectedItem);
                       if(items.length === propsItems.length){
                           allChecked = true;
                       }
                   } else {
                       let index = items.indexOf(selectedItem);
                       if(index !== -1){
                           items.splice(index, 1);
                       }
                   }
           }
           this.setState({
               checkedItems: items,
               allIsChecked: allChecked
           });
        }

        //  remove popup
        removeItems(){
            this.openRemovePopup(this.state.checkedItems);
        }

        openRemovePopup(items) {
            this.setState({
                removePopupOpened : true,
                itemsForRemovePopup: items
            });
        }  
        
        closeRemovePopup() {
            this.setState({
                removePopupOpened : false
            });
            this.setInitialStateCheckboxes();
        }

        setInitialStateCheckboxes() {
            this.setState({ 
                allIsChecked: false,
                checkedItems: [],
                itemsForRemovePopup: []
            });
        }

        removeItemsFromDb(){
            DataSource.removeFromDb(this.state.itemsForRemovePopup, this.state.dbDataType);
            this.closeRemovePopup();
        }

        addToShoppingList(event, product){
            event.preventDefault();
            DataSource.addToShoppingList(product);
        }

        render(){
            return (
                <div>         
                <Header title={this.state.headerTitle}
                                  allIsChecked={this.state.allIsChecked}
                                  checkedItems={this.state.checkedItems} 
                                  checkedAllItems={(checked)=> { this.toggleSelectedItems(true, undefined, checked)}}
                                  removeIconClicked={(item) => this.removeItems()}/>
                 {
                     this.props.items.map((item) => {
                         return <div className="section-item" key={item.key}>
                                { this.state.type === Constants.CATEGORIES ? 
                                    <div className="flex space-between"> 
                                        <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                    checkedItem={(checked, item) => this.toggleSelectedItems(false, item, checked)}/>
                                        <NameEdit item={item} dbDataType={this.state.dbDataType}/>
                                    </div>
                                    : 
                                    <div className="flex space-between"> 
                                        <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                        checkedItem={(checked, item) => this.toggleSelectedItems(false, item, checked)}/>
                                        <ProductCreateEdit type="edit" popupTitle={Constants.TITLES.EDIT} item={item}/>
                                        <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => this.addToShoppingList(event, item)}/>
                                    </div>
                                }
                         </div>
                     })
                 }
                 <WrappedComponent {...this.props}/>
                 <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                              items={this.state.itemsForRemovePopup}
                              confirmRemoveItems = {() => this.removeItemsFromDb()}
                              closeRemovePopup={()=> this.closeRemovePopup()}/> 
             </div>
            )
        }
    }
}

export default hocCategoriesProductsList;