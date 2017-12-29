import React, { Component } from 'react';

import Header from '../admin-categories-products/Header';
import NameEdit from '../admin-categories-products/NameEdit';
import RemoveItem from '../admin-categories-products/RemoveItem';
import RemovePopup from '../../popups/RemovePopup';
import CategoryItemInfo from '../admin-categories/crud/CategoryItemInfo';
import ProductItemInfo from '../admin-products/crud/ProductItemInfo';
import ProductEdit from '../admin-products/crud/ProductEdit';

export function hocCategoriesProductsList (WrappedComponent, options){
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
        removeIconAllClicked(){
            this.openRemovePopup(this.state.checkedItems);
        }

        removeIconItemClicked(item){
            this.openRemovePopup([item]);
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
            this.state.itemsForRemovePopup.forEach( item => {
                if(item.key){
                    this.state.dbDataType.child(item.key).remove();
                }
            })
            this.closeRemovePopup();
        }


        render(){
            return (
                <div>         
                <Header title={this.state.headerTitle}
                                  isChecked={this.state.allIsChecked} 
                                  checkedAllItems={(checked)=> { this.toggleSelectedItems(true, undefined, checked)}}
                                  removeIconClicked={(item) => this.removeIconAllClicked()}/>
                 {
                     this.props.items.map((item) => {
                         return <div className="section-item" key={item.key}>
                                { this.state.type === 'categories' ? 
                                    <div className="flex space-between"> 
                                        <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                    checkedItem={(checked, item) => this.toggleSelectedItems(false, item, checked)}/>
                                        <NameEdit item={item} dbDataType={this.state.dbDataType}/>
                                    </div>
                                    : 
                                    <div className="flex space-between"> 
                                        <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                        checkedItem={(checked, item) => this.toggleSelectedItems(false, item, checked)}/>
                                        <ProductEdit item={item} dbDataType={this.state.dbDataType}/>
                                    </div>
                                }
                                 
                                 <RemoveItem item={item} showRemoveButton={this.state.checkedItems.indexOf(item) !== -1}
                                                 removeIconClicked={(item) => this.removeIconItemClicked(item)}/>
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