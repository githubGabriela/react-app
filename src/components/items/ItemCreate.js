import React, { Component } from 'react';

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
        dbData.push({category: value}); 
    }

    render() {
        return (
            <form onSubmit={this.submit}> 
                <input type="text"
                    autoFocus
                    placeholder={this.props.placeholder}
                    value= {this.state.input.value}
                    onChange = {this.inputChange}
                />
                <button type="submit" 
                    title="Add">
                    Add
                </button>
                <button type="reset" 
                    title="Reset"
                    onClick={this.reset}>
                    Cancel
                </button>
            </form>
        );
    }
}

export default ItemCreate;
