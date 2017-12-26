// Usage:
// <Items sectionTitle="Categories" items={this.props.categories} propertyToShow='category'/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import ProductNameEdit from '../admin-products/crud/ProductNameEdit';
import CategoryNameEdit from '../admin-categories/crud/CategoryNameEdit';
import ColorPopup from '../../popups/ColorPopup';

import CategoriesHeader from '../admin-categories/list/CategoriesHeader';
import CategoryItemInfo from '../admin-categories/list/CategoryItemInfo';
import CategoryRemove from '../admin-categories/crud/CategoryRemove';
import RemovePopup from '../../popups/RemovePopup';

import '../../../assets/css/General.css';

class Items extends Component {
     constructor(props) {
             super(props);
             this.state = {
                 selectedItems: [],
                 modalIsOpened: false,
                 allChecked: false,
                 showRemoveButtons : false,
                 showColorPopup: false,
                 colorForPopup: ''
             }

             this.removeItem = this.removeItem.bind(this);
             this.handleItem = this.handleItem.bind(this);
             this.openModal = this.openModal.bind(this);
             this.checkAllItems = this.checkAllItems.bind(this);
             this.toggleCheckAll = this.toggleCheckAll.bind(this);
             this.toggleColorPopup = this.toggleColorPopup.bind(this);
         }

         toggleColorPopup(item){
            this.setState({
                showColorPopup: true,
                colorForPopup: item.value.color
            })
         }
    
         toggleCheckAll = (event) => {
            const allChecked = event.target.checked;
            allChecked ? this.checkAllItems() : this.uncheckAllItems();

            this.setState({
                allChecked: !this.state.allChecked,
                showRemoveButtons: !this.state.allChecked
              });
          }
          
          checkAllItems(){
              const items = this.props.items;
              this.props.items.forEach(item => {
                item.isChecked = true; 
              });
              this.setState({
                selectedItems: this.props.items
            });
         }

         uncheckAllItems(){
            this.props.items.forEach(item => {
                item.isChecked = false; 
              });
            this.setState({
                selectedItems: []
            });
         }

         removeItem(item) {
            this.setState({
                selectedItems: [item],
                modalIsOpened: true
            });
        }

         handleItem(isChecked, item) {
           const data = this.state.selectedItems;
                if(isChecked){
                    data.push(item);
                }else{
                    data.forEach(oneItem => {
                        if(oneItem.key === item.key){
                            data.pop(item);
                        }
                    })
                }
                this.setState({
                    selectedItems: data,
                });
        }

        getExistentItem(data, item) {
            for(let i=0; i<data.length; i++){
                let oneItem = data[i];
                if(oneItem.key === item.key) {
                   return oneItem;
                }
            };

            let abc = data.filter(oneItem => {
               item.key === oneItem.key;
            });
            return undefined;
        }

        openModal(){
            this.setState({
                modalIsOpened : true
            });
        }

    render() {
        return (
            <div>         
               <CategoriesHeader allChecked={this.state.allChecked} showRemoveButtons="true"/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                <CategoryItemInfo item={item}/>
                                <CategoryNameEdit item={item}/>
                                
                            
                                <CategoryRemove item={item}/>
                        </div>
                    })
                }
                <ColorPopup showPopup={this.state.showColorPopup} color={this.state.colorForPopup}/>
                <RemovePopup selectedItems={this.state.selectedItems} modalIsOpened={this.state.modalIsOpened}/> 
            </div>
        );
    }
}

export default Items;