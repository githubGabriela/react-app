import React, { Component } from 'react';

import { dbData } from '../../config/constants';

class CategoryCreate extends Component {

    constructor() {
        super();
        this.state = {
            input : {
                value : ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInput = this.resetInput.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const value = this.state.input.value;
        if(this.isValidValue(value) && !this.exists(value)){
            dbData.push({category : value});    
        }  
        this.resetInput();
    }

    resetInput() {
        this.state.input.value = '';
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            {/* TODO -refactor this */}
                <input type="text"
                autoFocus
                placeholder="category"
                ref={(input) => this.state.input = input}
                />

                <button type="submit" className="ButtonContainer"
                                title="Add"
                                placeholder="Add a new category">
                                Add
                </button>
            </form>
        );
    }
}

export default CategoryCreate;
