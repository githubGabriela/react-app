// Usage:
// <AdminProducts />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import Header from '../../common/Header';
import ProductCreateEdit from '../crud/ProductCreateEdit';
import ProductItemInfo from '../crud/ProductItemInfo';
import RemovePopup from '../../../popups/RemovePopup';

import '../../../../assets/css/General.css';

class List extends Component {
    constructor() {
        super();
        this.state = {
            checkedItems: [],
            allIsChecked : false,
            itemsForRemovePopup: [],
            removePopupOpened: false
        }
    }
    
    shouldComponentUpdate(nextProps) {
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

    setItemsForPopup(){
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


    render() {
        return (
            <div>         
                <Header title={Constants.TITLES.PRODUCTS}
                        allIsChecked={this.state.allIsChecked}
                        checkedItems={this.state.checkedItems} 
                        checkedAllItems={(checked)=> { Utils.toggleAllItems(this.props.items, checked, result => this.setState(result))}}
                        removeIconClicked={(item) => { this.openRemovePopup(); this.setItemsForPopup()}}/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                    <div className="flex space-between"> 
                                        <ProductItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                        checkedItem={(checked, item) => Utils.toggleSelectedItems(this.props.items, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        <ProductCreateEdit type={Constants.UTILS.EDIT} popupTitle={Constants.TITLES.EDIT} item={item}/>
                                        <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => {Utils.preventDefault(event); DataSource.addToShoppingList(item)}}/>
                                    </div>
                        </div>
                    })
                }
                <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                            items={this.state.itemsForRemovePopup}
                            confirmRemoveItems = {() => { 
                                                    DataSource.removeProducts(this.state.itemsForRemovePopup); 
                                                    this.closeRemovePopup();
                                                    this.setInitialStateCheckboxes()}
                                                }
                            closeRemovePopup={()=> this.closeRemovePopup()}/> 
         </div>
        )
    }
}

List.propTypes = {
    items: PropTypes.array
}

export default List;
