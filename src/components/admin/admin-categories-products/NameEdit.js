// Usage:
// <NameEdit item={item}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { hocItemNameEdit } from '../hoc/HocItemNameEdit';

import '../../../assets/css/General.css';

class Edit extends Component {
    constructor(){
        super();
        this.confirm = this.confirm.bind(this);
    }
    
    confirm(event) {
        event.preventDefault();
        let key = this.props.item.key;
        if(key){
            this.props.dbDataType.child(key).update({name: this.props.nameToUpdate}); // dbDataType = dbDataCategories or dbDataProducts
        }
    }

    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding" onClick={this.confirm}/>
        );
    }
}


const NameEdit = hocItemNameEdit(
    Edit,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
);

export default NameEdit;
