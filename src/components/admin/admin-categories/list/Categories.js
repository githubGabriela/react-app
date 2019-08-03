// Usage:
// <Categories/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';
import Create from '../crud/Create';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';
import Edit from '../crud/Edit';
import Item from '../crud/Item';
import Settings from '../../../common/Settings';

import '../../../../assets/css/General.css';
import RemovePopup from '../../common/RemovePopup';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            initialCategories: [],
            checkedItems: [],
            checkAll: false,
            showRemovePopup: false,
            showColorPopup: false,
            colorForPopup: '',
            showSettingsFields: false
        }
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
        this.removeConfirmed = this.removeConfirmed.bind(this);
        this.hideRemovePopup = this.hideRemovePopup.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        DataSource.getCategories(items => {
            this.setState({
                categories: items,
                initialCategories: items
            });
        });
    }

    shouldComponentUpdate() {
        return true;
    }

    categoryCreated(created){
        if(created){
            this.resetCheckboxes();
        }
    }

    resetCheckboxes() {
        this.setState({
            checkedItems: [],
            checkAll: false
        });
    }

    toggleColorPopup(item) {
        this.setState({
            showColorPopup: true,
            colorForPopup: item.value.color
        })
    }

    toggleSettingsFields() {
        let toggle = !this.state.showSettingsFields;
        this.setState({
            showSettingsFields: toggle
        });
    }

    removeItem(item) {
        if (item) {
            this.state.checkedItems = [item];
        }
        this.showRemovePopup();
    }

    showRemovePopup() {
        if (this.state.checkedItems.length > 0) {
            this.setState({ showRemovePopup: true });
        }
    }
    
    hideRemovePopup() {
        this.setState({ showRemovePopup: false })
    }

    removeConfirmed() {
        DataSource.removeCategoriesWithProducts(this.state.checkedItems);
        this.resetCheckboxes();
        this.hideRemovePopup()
    }

    toggleItems(checked, item) {
        if (item) {
            Utils.toggleItems(this.state.categories, this.state.checkedItems, item, checked, result => this.setState(result));
        } else {
            Utils.toggleAll(this.state.categories, checked, result => this.setState(result));
        }
    }

    render() {
        let showCheckbox = (item) => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <div className="center-from-top icon-on-left">
                            <input type="checkbox"
                                checked={this.state.checkedItems.indexOf(item) !== -1}
                                value={item.value.name}
                                onChange={(event) => { this.toggleItems(event.target.checked, item); }} />
                        </div>
                        : null
                    }
                </div>
            );
        }

        let showCheckboxAll = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <input type="checkbox" value="allChecked"
                            checked={this.state.checkAll}
                            onChange={(event) => { this.toggleItems(event.target.checked); }} />
                        : null
                    }
                </div>
            );
        }

        let showAllItems = () => {
            return (<div>
                {
                    this.state.categories.map((item) => {
                        return <div className="section-item" key={item.key}>
                            <div className="flex space-between">
                                {showCheckbox(item)}
                                <Item item={item} />
                                <Edit item={item} showSettingsFields={this.state.showSettingsFields} />
                                {showRemoveIcon(item)}
                            </div>
                        </div>
                    })
                }

            </div>
            );
        }

        let showRemoveIcon = (item) => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FontAwesome name="close" onClick={() => { this.removeItem(item);}} />
                        : null
                    }
                </div>
            );
        }

        let showFilteringSorting = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FilteringAndSorting showComponent={this.state.categories.length > 0}
                            dataType={Constants.CATEGORIES}
                            items={this.state.categories}
                            initialItems={this.state.initialCategories}
                            setFilteredItems={items => this.setState({ categories: items })} />
                        : null
                    }
                </div>
            );
        }

        let showCreate = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <div className="create-input">
                            <Create categoryCreated={(created)=> this.categoryCreated(created)}/>
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
                            <Settings toggleSettings={(event) => this.toggleSettingsFields(event)} />
                        </div>
                        {showCreate()}
                        {showFilteringSorting()}
                        <div className="flex space-between center-margin-from-top">
                            {showCheckboxAll()}
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
                <RemovePopup
                    popupType={Constants.TITLES.CATEGORIES}
                    items={this.state.checkedItems}
                    showRemovePopup={this.state.showRemovePopup}
                    confirmed={this.removeConfirmed}
                    canceled={this.hideRemovePopup}
                />
            </div>
        );
    }
}


export default Categories;
