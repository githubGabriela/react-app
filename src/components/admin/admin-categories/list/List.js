// Usage:
//  <CategoriesList sectionTitle="Categories" items={this.props.categories}/>

import React, { Component } from 'react';

import * as Constants from '../../../../utils/Constants';
import { dbDataCategories } from '../../../../config/constants';
import { hocCategoriesProductsList } from '../../hoc/HocCategoriesProductsList';
import ColorPopup from '../../../popups/ColorPopup';

import '../../../../assets/css/General.css';

class Categories extends Component {

        constructor(props){
            super(props);
            this.state = {
                showColorPopup: false,
                colorForPopup: ''
            }
            this.toggleColorPopup = this.toggleColorPopup.bind(this);
        }

        toggleColorPopup(item) {
            this.setState({
                showColorPopup: true,
                colorForPopup: item.value.color
            })
         }
         

    render() {
        return (
            <div>
                <ColorPopup showPopup={this.state.showColorPopup} color={this.state.colorForPopup}/>
            </div>
            );
    }
}

const List = hocCategoriesProductsList(
    Categories,
    {
        headerTitle: Constants.TITLES.CATEGORIES,
        dbDataType: dbDataCategories,
        type: Constants.CATEGORIES
    }
);

export default List;