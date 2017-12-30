// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import { hocItemNameCreate } from '../../hoc/HocItemNameCreate';

import '../../../../assets/css/General.css';

class CategoryName extends Component {

    constructor() {
        super();
        this.pushCategoryToDb = this.pushCategoryToDb.bind(this);
    }

    pushCategoryToDb(event) {
        event.preventDefault();
        let category = { 
            name:this.props.nameToUpdate, 
            color: this.props.color
        }
        DataSource.addCategory(category);
   }
   
    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding"
                         onClick={this.pushCategoryToDb}/>
        );
    }
}


const CategoryNameCreate = hocItemNameCreate(
    CategoryName,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
    
);

export default CategoryNameCreate;
