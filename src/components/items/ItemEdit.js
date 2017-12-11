import React, { Component } from 'react';
import { dbData } from '../../config/constants';

import '../../assets/css/General.css';

class ItemEdit extends Component {
    constructor(props){
       super(props);

        const propsItem = {
            key: this.props.item.key,
            value : this.props.item.value[this.props.propertyToShow]
        };
        this.state = {
            item : propsItem,
            initialItem: propsItem,
            isEditable : false
        };

       this.edit = this.edit.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.confirm = this.confirm.bind(this);
       this.resetItem = this.resetItem.bind(this);
       this.setReadOnly = this.setReadOnly.bind(this);
    }

    edit(event){
        event.preventDefault();
        this.setState({
            isEditable : true
        });
    }

    handleChange(event){
        this.setState({
            item: {
                key: this.state.item.key,
                value: event.target.value
            }
        });

        console.log(this.state);
    }

    confirm(event) {
        event.preventDefault();
        if(this.isValidValue(this.state.item.value)){
            this.setValueToDb(this.state.item.key, this.state.item.value, [this.props.propertyToShow]);
            this.setReadOnly();
        }
    }

    resetItem(event) {
        event.preventDefault();
        this.setState({
            item : this.state.initialItem
        });
        this.setReadOnly();
    }

    setReadOnly(){
        this.setState({
            isEditable: false
        });
    }

    isValidValue(value){
        return value.trim().length > 0;
    }

    setValueToDb(key, value, property){
        if(key){
            dbData.child(key).set({[property] : value});  // E.g: { category : 'value' }
        }
    }

    
    render() {
        return (
            <div>
                {!this.state.isEditable ? 
                    <div className="flex">
                        <div>{this.state.item.value}</div>
                        <button onClick={this.edit}>Edit</button>
                    </div>
                 : 
                    <div>
                        <input type="text"  value={this.state.item.value} onChange={this.handleChange}/>
                        <button type="submit" onClick={this.confirm}>Confirm</button>
                        <button type="reset" onClick={this.resetItem}>Cancel</button>
                    </div>
                }
            </div>
        );
    }
}

export default ItemEdit;
