import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../config/DataSource';
import * as Constants from '../../../utils/Constants';
import * as Utils from '../../../utils/Utils';
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


        render(){
            return (
                <div>         
                <Header title={this.state.headerTitle}
                                  allIsChecked={this.state.allIsChecked}
                                  checkedItems={this.state.checkedItems} 
                                  checkedAllItems={(checked)=> { Utils.toggleAllItems(this.props.items, checked, result => this.setState(result))}}
                                  removeIconClicked={(item) => { this.openRemovePopup(); this.setItemsForPopup()}}/>
                 {
                     this.props.items.map((item) => {
                         return <div className="section-item" key={item.key}>
                                { this.state.type === Constants.CATEGORIES ? 
                                    <div className="flex space-between"> 
                                        <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                    checkedItem={(checked, item) => Utils.toggleSelectedItems(this.props.items, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        <NameEdit item={item} dbDataType={this.state.dbDataType}/>
                                    </div>
                                    : 
                                    <div className="flex space-between"> 
                                        <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                        checkedItem={(checked, item) => Utils.toggleSelectedItems(this.props.items, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        <ProductCreateEdit type="edit" popupTitle={Constants.TITLES.EDIT} item={item}/>
                                        <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => {Utils.preventDefault(event); DataSource.addToShoppingList(item)}}/>
                                    </div>
                                }
                         </div>
                     })
                 }
                 <WrappedComponent {...this.props}/>
                 <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                              items={this.state.itemsForRemovePopup}
                              confirmRemoveItems = {() => { 
                                                    DataSource.removeFromDb(this.state.itemsForRemovePopup, this.state.dbDataType); 
                                                    this.closeRemovePopup();
                                                    this.setInitialStateCheckboxes()}
                                                   }
                              closeRemovePopup={()=> this.closeRemovePopup()}/> 
             </div>
            )
        }
    }
}

export default hocCategoriesProductsList;