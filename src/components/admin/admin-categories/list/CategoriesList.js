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
             this.state = {
                 checkedItems: [],
                 allIsChecked : false,
                 modalIsOpened: false,
                 showColorPopup: false,
                 colorForPopup: ''
             }

             this.toggleSelections = this.toggleSelections.bind(this);
             this.openModal = this.openModal.bind(this);
             this.toggleColorPopup = this.toggleColorPopup.bind(this);
         }

         toggleSelections(allSelected, selectedItem, checked) {
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
            console.log(items);
         }


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
               <CategoriesHeader isChecked={this.state.allIsChecked} checkedAllItems={(checked)=> { this.toggleSelections(true, undefined, checked)}}/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                  checkedItem={(checked, item) => this.toggleSelections(false, item, checked)}/>
                                <CategoryNameEdit item={item}/>
                                <CategoryRemove item={item} showRemoveButton={this.state.checkedItems.indexOf(item) !== -1}/>
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