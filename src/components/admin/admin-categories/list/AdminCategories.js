// Usage:
// <AdminCategories/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';
import CategoryCreate from '../crud/CategoryCreate';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';
import CategoryNameEdit from '../crud/CategoryNameEdit';
import CategoryItemInfo from '../crud/CategoryItemInfo'; 
import RemovePopup from '../../../popups/RemovePopup';

import '../../../../assets/css/General.css';

class AdminCategories extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            initialCategories: [],
            checkedItems: [],
            allIsChecked : false,
            itemsForRemovePopup: [],
            removePopupOpened: false,
            showColorPopup: false,
            colorForPopup: ''
        }
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        DataSource.getCategories( items => {
            this.setState({
                categories : items,
                initialCategories : items   
            });
        });
    }

    shouldComponentUpdate(nextProps){
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

    setItemsForPopup() {
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

    toggleColorPopup(item) {
        this.setState({
            showColorPopup: true,
            colorForPopup: item.value.color
        })
     }

    render() {
        let showAllItems = () => {
            return  (<div>         
                    {
                        this.state.categories.map((item) => {
                            return <div className="section-item" key={item.key}>
                                        <div className="flex space-between"> 
                                            <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                              checkedItem={(checked, item) => 
                                                                            Utils.toggleSelectedItems(this.state.categories, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                            <CategoryNameEdit item={item}/>
                                        </div>
                            </div>
                        })
                    }
                  
             </div>
            );
        }

        let showCheckAll = () => {
            return (
                <input type="checkbox" value="allChecked" 
                    checked={this.state.allIsChecked}
                    onChange={(event)=> { Utils.toggleAllItems(this.state.categories, event.target.checked, result => this.setState(result))}}/> 
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
                <FilteringAndSorting showComponent={this.state.categories.length > 0 }
                    dataType={Constants.CATEGORIES}
                    items={this.state.categories} 
                    initialItems={this.state.initialCategories}
                    setFilteredItems = {items => this.setState({categories: items})}/> 
            );
        }

        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title"> 
                            {Constants.TITLES.CATEGORIES}
                            <div className="create-input">
                                <CategoryCreate/>
                            </div>
                            {showFilteringSorting()}
                        <div className="flex space-between center-margin-from-top">
                            {showCheckAll()}
                            {showRemoveIcon()}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {showHeader()}
                {showAllItems()}
                <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                                items={this.state.itemsForRemovePopup}
                                confirmRemoveItems = {() => { 
                                                        DataSource.removeCategories(this.state.itemsForRemovePopup); 
                                                        this.closeRemovePopup();
                                                        this.setInitialStateCheckboxes()}
                                                    }
                                closeRemovePopup={()=> this.closeRemovePopup()}/> 
            </div>
        );
    }
}


export default AdminCategories;
