// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import { hocItemNameCreate } from './HocItemNameCreate';

import '../../../../assets/css/General.css';

class CategoryName extends Component {

    constructor() {
        super();
        this.state = {
            errorMessage : undefined
        }
        this.pushCategoryToDb = this.pushCategoryToDb.bind(this);
    }

    pushCategoryToDb(event) {
        event.preventDefault();
        let category = { 
            name:this.props.nameToUpdate, 
            color: this.props.color
        }
        DataSource.addCategory(category, exists => {
            if(exists) {
                this.setState({
                    errorMessage: 'This category already exists'
                });
            }
        });
   }
   
    render() {
        return (
            <div>
                <FontAwesome name="check" className="icon-with-padding"
                            onClick={this.pushCategoryToDb}/>
                {this.state.errorMessage ? 
                    <div className="red">{this.state.errorMessage}</div>
                : null
                }
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
