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
            allIsChecked: false,
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

    checkAllItems() {
        this.setState({
            checkedItems: this.state.categories
        });
    }

    checkItem(item) {
        this.state.checkedItems.push(item);
    }

    setInitialStateCheckboxes() {
        this.setState({
            checkedItems: [],
            allIsChecked: false
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
        this.setInitialStateCheckboxes();
        this.setState({ removeCategories: false });
    }

    removeCanceled() {
        this.setState({ removeCategories: false })
    }


    render() {
        let showAllItems = () => {
            return (<div>
                {
                    this.state.categories.map((item) => {
                        return <div className="section-item" key={item.key}>
                            <div className="flex space-between">
                                <Item isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item}
                                    showSettingsFields={this.state.showSettingsFields}
                                    checkedItem={(checked, item) =>
                                        Utils.toggleSelectedItems(this.state.categories, this.state.checkedItems, item, checked, result => this.setState(result))} />
                                <Edit item={item} showSettingsFields={this.state.showSettingsFields} />
                            </div>
                        </div>
                    })
                }

            </div>
            );
        }

        let showCheckAll = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <input type="checkbox" value="allChecked"
                            checked={this.state.allIsChecked}
                            onChange={(event) => { Utils.toggleAllItems(this.state.categories, event.target.checked, result => this.setState(result)) }} />
                        : null
                    }
                </div>
            );
        }

        let showRemoveAll = () => {
            return (
                <div>
                    {(this.state.allIsChecked || this.state.checkedItems.length > 0) ?
                        <FontAwesome name="close" onClick={(item) => { this.checkAllItems() }} />
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
                            {showCheckAll()}
                            {showRemoveAll()}
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
