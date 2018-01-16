// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';

import '../../../../assets/css/General.css';

class CategoryNameCreate extends Component {

    constructor() {
        super();
        this.state = {
            inputValue : '',
            errorMessage : ''
        }
        this.clearInput = this.clearInput.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.color !== nextProps.color;
    }
           
    pushCategoryToDb() {
        let category = { 
            name: this.state.inputValue, 
            color: this.props.color
        }
        if(Utils.isValidValue(this.state.inputValue)) {
            DataSource.addCategory(category, error => this.setError(error));
        }
   }
 
   setError(error) {
    if(error && error.message){
        this.setState({
            errorMessage : error.message
        });
        } else{
            this.clearInput();
        }  
    }

    clearError() {
        this.setState({
            errorMessage :''
        });
    }

    clearInput() {
        this.setState({
            inputValue : ''
        });
    }
    
    render() {
        return  (
            <div> 
                <form className="flex space-between"> 
                    <input type="text" className="input-text full-width"
                              placeholder="Create"
                              autoFocus
                              onChange={(event) => {
                                                    Utils.preventDefault(event); 
                                                    this.setState({inputValue : event.target.value});
                                                    this.clearError()
                                                    }}/>
                    <div className="edit-icons-textarea center-margin-from-top">
                        <FontAwesome name="check" className="icon-with-padding"
                                     onClick={(event) => {
                                                          Utils.preventDefault(event); 
                                                          this.pushCategoryToDb();
                                                          }}/>
                        <FontAwesome name="close" className="icon-with-padding" 
                                     onClick={(event) => {
                                               Utils.preventDefault(event); 
                                               this.clearInput();
                                               this.clearError();
                                               }}/>
                        <div className="red">{this.state.errorMessage}</div>
                    </div>
                </form>
            </div>
            );
    }
}

CategoryNameCreate.proptypes = {
    color: PropTypes.string
}

export default CategoryNameCreate;
