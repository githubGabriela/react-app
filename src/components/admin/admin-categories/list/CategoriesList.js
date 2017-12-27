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
                 showRemoveButtons : false,
                 modalIsOpened: false,
                 showColorPopup: false,
                 colorForPopup: ''
             }

             this.toggleChecked = this.toggleChecked.bind(this);
             this.checkAllItems = this.checkAllItems.bind(this);
             this.openModal = this.openModal.bind(this);
             this.toggleColorPopup = this.toggleColorPopup.bind(this);
         }

        //  Checkboxes
        toggleChecked(checked, item) {
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
            checked ?  this.checkAllItems() : this.uncheckAllItems();
        }

        checkAllItems(){
            console.log('check all');
          const items = this.props.items;
          this.props.items.forEach(item => {
            item.isChecked = true; 
          });
          this.setState({
            checkedItems: this.props.items
          });
       }

       uncheckAllItems(){
          console.log('uncheck all');
          this.props.items.forEach(item => {
              item.isChecked = false; 
            });
          this.setState({
              checkedItems: []
          });
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
               <CategoriesHeader checkedAllItems={(checked)=> { this.toggleAllItems(checked)}} showRemoveButtons="true"/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                <CategoryItemInfo item={item} checkedItem={(checked, item) => this.toggleChecked(checked, item)}/>
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