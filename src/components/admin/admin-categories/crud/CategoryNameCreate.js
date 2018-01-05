// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';
import { hocItemNameCreate } from './HocItemNameCreate';

import '../../../../assets/css/General.css';

class CategoryName extends Component {

    constructor() {
        super();
        this.state = {
            errorMessage : ''
        }
    }

    pushCategoryToDb() {
        let category = { 
            name:this.props.nameToUpdate, 
            color: this.props.color
        }
        DataSource.addCategory(category, error => this.setError(error));
   }
 
   setError(error){
    if(error && error.message){
        this.setState({
            errorMessage : error.message
        });
    }
}
    render() {
        return (
            <div>
                <FontAwesome name="check" className="icon-with-padding"
                            onClick={(event) => {Utils.preventDefault(event); this.pushCategoryToDb()}}/>
                <div className="red">{this.state.errorMessage}</div>
            </div>
            
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
