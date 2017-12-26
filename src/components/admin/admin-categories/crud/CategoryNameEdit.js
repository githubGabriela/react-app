// Usage:
// <CategoryNameEdit item={item}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataCategories } from '../../../../config/constants';
import { hocItemNameEdit } from '../../hoc/HocItemNameEdit';

import '../../../../assets/css/General.css';

class CategoryEdit extends Component {
    constructor(){
        super();
        this.confirm = this.confirm.bind(this);
    }
    
    confirm(event) {
        event.preventDefault();
        let key = this.props.item.key;
        if(key){
            dbDataCategories.child(key).update({name: this.props.nameToUpdate}); 
        }
    }

    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding" onClick={this.confirm}/>
        );
    }
}


const CategoryNameEdit = hocItemNameEdit(
    CategoryEdit,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
);

export default CategoryNameEdit;
