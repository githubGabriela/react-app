// Usage:
// <Products/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../utils/Constants';
import * as Utils from '../../../utils/Utils';
import * as DataSource from '../../../config/DataSource';
import CreateEdit from '../admin-products/crud/CreateEdit';
import FilteringAndSorting from '../../filtering-sorting/FilteringAndSorting';
import Item from '../admin-products/crud/Item';
import RemovePopup from '../common/RemovePopup';
import Settings from '../../common/Settings';

// import '../../assets/css/General.css';

class CommonProductsCategories extends Component {
    constructor() {
        // clean
        super();
        this.state = {
            products: [],
            initialProducts: [],
            checkedItems: [],
            checkAll: false,
            showRemovePopup: false,
            showSettingsFields: true
        }
        this.removeConfirmed = this.removeConfirmed.bind(this);
        this.hideRemovePopup = this.hideRemovePopup.bind(this);
    }

    // move
    componentDidMount() {
        this.getProducts();
    }

    // move
    getProducts() {
        DataSource.getProducts(items => {
            this.setState({
                products: items,
                initialProducts: items
            });
        });
    }

    itemCreated(created){
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
        this.setState({
            showRemovePopup: false
        });
    }

    // move
     removeConfirmed() {
        DataSource.removeProducts(this.state.checkedItems);
        this.resetCheckboxes();
        this.hideRemovePopup();
    }

    toggleItems(checked, item) {
        if (item) {
            Utils.toggleItems(this.state.products, this.state.checkedItems, item, checked, result => this.setState(result));
        } else {
            Utils.toggleAll(this.state.products, checked, result => this.setState(result));
        }
    }

    // move
    render() {
        // move
        let showCart = (item) => {
            return (
                <div className="space-right">
                    <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => { Utils.preventDefault(event); DataSource.addToShoppingList(item) }} />
                </div>
            );
        }

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

        // move
        let showAllItems = () => {
            return (
                <div>
                    {
                        this.state.products.map((item) => {
                            return <div className="section-item" key={item.key}>
                                <div className="flex space-between">
                                    <div>
                                        {showCheckbox(item)}
                                        <Item item={item} />
                                    </div>
                                    <div className="center-from-top flex space-between">
                                        <div className="edit-cart-icons">
                                            <CreateEdit type={Constants.UTILS.EDIT} popupTitle={Constants.TITLES.EDIT}
                                                item={item}
                                                showSettingsFields={this.state.showSettingsFields} />
                                            {showRemoveIcon(item)}
                                        </div>
                                        <div>
                                            {showCart(item)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
        
        let showRemoveIcon = (item) => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FontAwesome name="close" onClick={() => { this.removeItem(item); }} />
                        : null
                    }
                </div>
            );
        }
        // move
        let showFilteringSorting = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FilteringAndSorting showComponent={this.state.products.length > 0}
                            dataType={Constants.PRODUCTS}
                            items={this.state.products}
                            initialItems={this.state.initialProducts}
                            setFilteredItems={items => this.setState({ products: items })} />
                        : null
                    }
                </div>
            )
        }

        // move
        let showCreateButton = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <div className="create-input align-left">
                            <CreateEdit type={Constants.UTILS.CREATE} popupTitle={Constants.TITLES.CREATE}
                            itemCreated={(created)=> this.itemCreated(created)} />
                        </div>
                        : null
                    }
                </div>
            );
        }
        //move
        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title">
                        <div className="align-right">
                            <Settings toggleSettings={(event) => this.toggleSettingsFields(event)} />
                        </div>
                        {Constants.TITLES.PRODUCTS}
                        {showCreateButton()}

                        {showFilteringSorting()}
                        <div className="flex space-between center-margin-from-top">
                            {showCheckboxAll()}
                            {showRemoveIcon()}
                        </div>
                    </div>
                </div>
            )
        }

        // move
        return (
            <div>
                {showHeader()}
                {showAllItems()}
                <RemovePopup
                    popupType={Constants.TITLES.PRODUCTS}
                    items={this.state.checkedItems}
                    showRemovePopup={this.state.showRemovePopup}
                    confirmed={this.removeConfirmed}
                    canceled={this.hideRemovePopup}
                />
            </div>
        );
    }
}

export default CommonProductsCategories;
