// Usage:
//  <CategoriesList sectionTitle="Categories" items={this.props.categories}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataCategories } from '../../../../config/constants';
import CategoriesHeader from './CategoriesHeader';
import CategoryItemInfo from './CategoryItemInfo';
import CategoryNameEdit from '../crud/CategoryNameEdit';
import CategoryRemove from '../crud/CategoryRemove';

import RemovePopup from '../../../popups/RemovePopup';
import ColorPopup from '../../../popups/ColorPopup';

import '../../../../assets/css/General.css';

class CategoriesList extends Component {

     constructor(props) {
             super(props);
             this.state = {
                 checkedItems: [],
                 allIsChecked : false,
                 itemsForRemovePopup: [],
                 removePopupOpened: false,
                 showColorPopup: false,
                 colorForPopup: ''
             }

             this.toggleSelectedItems = this.toggleSelectedItems.bind(this);
             this.removeItemsFromDb = this.removeItemsFromDb.bind(this);
             this.closeRemovePopup = this.closeRemovePopup.bind(this);
             this.toggleColorPopup = this.toggleColorPopup.bind(this);
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


        //  color popup
        toggleColorPopup(item) {
            this.setState({
                showColorPopup: true,
                colorForPopup: item.value.color
            })
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
                    dbDataCategories.child(item.key).remove();
                }
            })
            this.closeRemovePopup();
        }


    render() {
        return (
            <div>         
               <CategoriesHeader title="Categories"
                                 isChecked={this.state.allIsChecked} 
                                 checkedAllItems={(checked)=> { this.toggleSelectedItems(true, undefined, checked)}}
                                 removeIconClicked={(item) => this.removeIconAllClicked()}/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                  checkedItem={(checked, item) => this.toggleSelectedItems(false, item, checked)}/>
                                <CategoryNameEdit item={item}/>
                                <CategoryRemove item={item} showRemoveButton={this.state.checkedItems.indexOf(item) !== -1}
                                                removeIconClicked={(item) => this.removeIconItemClicked(item)}/>
                        </div>
                    })
                }
                <ColorPopup showPopup={this.state.showColorPopup} color={this.state.colorForPopup}/>
                <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                             categories={this.state.itemsForRemovePopup}
                             confirmRemoveItems = {() => this.removeItemsFromDb()}
                             closeRemovePopup={()=> this.closeRemovePopup()}/> 
            </div>
        );
    }
}

export default CategoriesList;