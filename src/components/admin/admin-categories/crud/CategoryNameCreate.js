// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataCategories } from '../../../../config/constants';
import { hocItemNameCreate } from '../../hoc/HocItemNameCreate';

import '../../../../assets/css/General.css';

class CategoryName extends Component {

    constructor() {
        super();
        this.pushCategoryToDb = this.pushCategoryToDb.bind(this);
    }

    pushCategoryToDb(event) {
        event.preventDefault();
        dbDataCategories.push(
            { 
                name:this.props.nameToUpdate, 
                color: this.props.color
            }
        ); 
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
