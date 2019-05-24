// Usage:
// <Categories/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';
import Create from '../crud/create/Create';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';
import Edit from '../crud/Edit';
import Item from '../crud/Item';
import Settings from '../../../common/Settings';

import '../../../../assets/css/General.css';
import Remove from '../crud/Remove';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            initialCategories: [],
            checkedItems: [],
            checkAll: false,
            removeCategories: false,
            showColorPopup: false,
            colorForPopup: '',
            showSettingsFields: false
        }
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
        this.removeConfirmed = this.removeConfirmed.bind(this);
        this.removeCanceled = this.removeCanceled.bind(this);
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

    shouldComponentUpdate(nextProps) {
        return true;
    }

    remove() {
        DataSource.removeCategoriesWithProducts(this.state.checkedItems, result => {
            if (result.length === 0) {
                this.resetCheckboxes();
            }
            console.log('checkAllItems', this.state.checkedItems);
        });
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

    removeConfirmed() {
        this.resetCheckboxes();
        this.setState({ removeCategories: false });
    }

    removeCanceled() {
        this.setState({ removeCategories: false })
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
                                onChange={(event) => {
                                    Utils.toggleItems(this.state.categories, this.state.checkedItems, item, event.target.checked, result => this.setState(result)
                                    )
                                }} />
                        </div>
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
                            </div>
                        </div>
                    })
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
                            onChange={(event) => { Utils.toggleAll(this.state.categories, event.target.checked, result => this.setState(result)) }} />
                        : null
                    }
                </div>
            );
        }

        let showRemoveIcon = () => {
            return (
                <div>
                    {(this.state.checkAll || this.state.checkedItems.length > 0) ?
                        <FontAwesome name="close" onClick={(item) => { this.remove() }} />
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
                            <Create />
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
                        {Constants.TITLES.CATEGORIES}
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
                <Remove removeCategories={this.state.removeCategories}
                    categoriesToRemove={this.state.checkedItems}
                    confirmed={this.removeConfirmed}
                    canceled={this.removeCanceled}
                />
            </div>
        );
    }
}


export default Categories;
