// Usage:
//  <CategoriesList sectionTitle="Categories" items={this.props.categories}/>

import React, { Component } from 'react';

import * as Constants from '../../../../utils/Constants';
import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import Header from '../../common/Header';
import NameEdit from '../crud/NameEdit';
import CategoryItemInfo from '../crud/CategoryItemInfo'; 
import ColorPopup from '../../../popups/ColorPopup';
import RemovePopup from '../../../popups/RemovePopup';

import '../../../../assets/css/General.css';

class List extends Component {

        constructor() {
            super();
            this.state = {
                checkedItems: [],
                allIsChecked : false,
                itemsForRemovePopup: [],
                removePopupOpened: false,
                showColorPopup: false,
                colorForPopup: ''
            }
            this.toggleColorPopup = this.toggleColorPopup.bind(this);
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
        return  (
            <div>         
                <Header title={Constants.TITLES.CATEGORIES}
                        allIsChecked={this.state.allIsChecked}
                        checkedItems={this.state.checkedItems} 
                        checkedAllItems={(checked)=> { Utils.toggleAllItems(this.props.items, checked, result => this.setState(result))}}
                        removeIconClicked={(item) => { this.openRemovePopup(); this.setItemsForPopup()}}/>
                {
                    this.props.items.map((item) => {
                        return <div className="section-item" key={item.key}>
                                    <div className="flex space-between"> 
                                        <CategoryItemInfo isChecked={this.state.checkedItems.indexOf(item) !== -1} item={item} 
                                                    checkedItem={(checked, item) => Utils.toggleSelectedItems(this.props.items, this.state.checkedItems, item, checked, result => this.setState(result))}/>
                                        <NameEdit item={item}/>
                                    </div>
                        </div>
                    })
                }
                <ColorPopup showPopup={this.state.showColorPopup} color={this.state.colorForPopup}/>
                <RemovePopup removePopupOpened={this.state.removePopupOpened} 
                            items={this.state.itemsForRemovePopup}
                            confirmRemoveItems = {() => { 
                                                    DataSource.removeCategories(this.state.itemsForRemovePopup); 
                                                    this.closeRemovePopup();
                                                    this.setInitialStateCheckboxes()}
                                                }
                            closeRemovePopup={()=> this.closeRemovePopup()}/> 
         </div>
        )
    }
}

export default List;