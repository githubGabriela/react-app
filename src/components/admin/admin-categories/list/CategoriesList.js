// Usage:
// <Items sectionTitle="Categories" items={this.props.categories} propertyToShow='category'/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

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
            console.log('props', this.props.items);
             this.state = {
                 checkedItems: [],
                 checkedItemsState: [],
                 showRemoveButtons : false,
                 modalIsOpened: false,
                 showColorPopup: false,
                 colorForPopup: '',
                 allIsChecked : false
             }

             this.toggleChecked = this.toggleChecked.bind(this);
             this.toggleAllItems = this.toggleAllItems.bind(this);
             this.openModal = this.openModal.bind(this);
             this.toggleColorPopup = this.toggleColorPopup.bind(this);
             this.handleTempArray = this.handleTempArray.bind(this);
         }

         handleTempArray(allSelected, individualSelected, selectedItem, checked) {
             let items = this.state.checkedItemsState;
             let allChecked = this.state.allIsChecked;

             if(allSelected && !individualSelected) {
                if(checked){
                    this.props.items.forEach( item => {
                        items.push(item.key);
                    });
                } else {
                items = [];
                allChecked = false;
            }
            } else if(individualSelected){
                if(checked) {
                    allChecked = false;
                    items.push(selectedItem.key);

                    if(items.length === this.props.items.length){
                        allChecked = true;
                    }
                } else {
                    let index = items.indexOf(selectedItem.key);
                    if(index !== -1){
                        items.splice(index, 1);
                        allChecked = false;
                    }
                }
            }
            this.setState({
                checkedItemsState: items,
                allIsChecked: allChecked
            });
            console.log(items);
         }


        //  Checkboxes
        toggleChecked(checked, item) {
            this.handleTempArray(false, true, item, checked);
            
           let checkedItems = this.state.checkedItems;
            if(checked) {
                checkedItems.push(item);
            } else {
                let index = checkedItems.indexOf(item);
                if(index !== -1){
                    checkedItems.splice(index, 1);
                }
            }
            this.setState({
                checkedItems: checkedItems
            });
            console.log(this.state.checkedItems);
        }

        toggleAllItems(checked){
            this.handleTempArray(true, false, undefined, checked);

            let checkedItems = checked ? this.props.items : [];
            this.setState({
                checkedItems: checkedItems,
                allIsChecked: checked
            })
        }


        // ColorPopup
        toggleColorPopup(item) {
            this.setState({
                showColorPopup: true,
                colorForPopup: item.value.color
            })
         }
         
         openModal() {
            this.setState({
                modalIsOpened : true
            });
        }

    render() {
        return (
            <div>         
               <CategoriesHeader isChecked={this.state.allIsChecked} checkedAllItems={(checked)=> { this.toggleAllItems(checked)}} showRemoveButtons="true"/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                <CategoryItemInfo isChecked={this.state.checkedItemsState.indexOf(item.key) !== -1} item={item} checkedItem={(checked, item) => this.toggleChecked(checked, item)}/>
                                <CategoryNameEdit item={item}/>
                                <CategoryRemove item={item}/>
                        </div>
                    })
                }
                <ColorPopup showPopup={this.state.showColorPopup} color={this.state.colorForPopup}/>
                <RemovePopup checkedItems={this.state.checkedItems} modalIsOpened={this.state.modalIsOpened}/> 
            </div>
        );
    }
}

export default CategoriesList;