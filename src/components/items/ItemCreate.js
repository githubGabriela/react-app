// Usage:
// <ItemCreate placeholder='Add a category' propertyToShow='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbData, dbRef } from '../../config/constants';

class ItemCreate extends Component {
    initialInput = {
        key: '',
        value : ''
    };

    constructor(props) {
        super(props);
        this.state = {
            input : this.initialInput
        }

        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    inputChange(event) {
        event.preventDefault();
        this.setState({
            input : {
                key : this.state.input.key,
                value: event.target.value
            }
        })
    }

    submit(event) {
        event.preventDefault();
        const value = this.state.input.value;
        if(this.isValidValue(value) && !this.exists(value)){
            this.pushToDb(value);
            this.reset(event);
        }
    }

    reset(event) {
        event.preventDefault();
        this.setState({ 
            input : this.initialInput
        });
    }

    isValidValue(value){
        return value.trim().length > 0;
    }

    exists(item) {
         // TODO - not working
        dbData.on('value', snapshot => {
            return snapshot.val() !== null;
        });
    }

    pushToDb(value) {
        if(this.props.isProduct){
            this.addProduct(value);  // {category: { products : [] }} 
         }else{
             this.addCategory(value); // {category : value} 
         }
    }

    addProduct(value){
        let category = this.props.entryToCreate;
        dbData.child(category.key).push({ product: value});
    }

    addCategory(value){
        dbData.push({category: value, color: this.props.color}); 
    }

    render() {
        return (
        <div>
            <form onSubmit={this.submit} className="flex space-between"> 
                <input type="text"
                    className="input-text input-text-longer"
                    autoFocus
                    placeholder={this.props.placeholder}
                    value= {this.state.input.value}
                    onChange = {this.inputChange}
                />
                <div className="edit-icons">
                    <FontAwesome name="check" className="icon-with-padding" onClick={this.submit}/>
                    <FontAwesome name="close" className="icon-with-padding" onClick={this.reset}/>
                </div>
            </form>
        </div>
        );
    }
}

export default ItemCreate;
