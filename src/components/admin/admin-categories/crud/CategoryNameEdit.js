// Usage:
// <CategoryNameEdit item={item}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import '../../../../assets/css/General.css';

class CategoryNameEdit extends Component {
 
    constructor(){
        super();
         this.state = {
             item : { key: '', value: '' },
             errorMessage: '',
             isEditable : false
         };
 
        this.inputChange = this.inputChange.bind(this);
        this.setReadOnly = this.setReadOnly.bind(this);
     }

     componentDidMount(){
         this.setState({
             item: this.props.item
         })
     }
 
     shouldComponentUpdate(nextProps){
         return true;
     }

     inputChange(event){
         let updatedName = event.target.value;
         if(updatedName !== this.state.item.value.name){
             this.setState({
                 item : {
                     key : this.state.item.key,
                     value : 
                     {
                         name: updatedName,
                         color: this.state.item.value.color
                     }
                 }
             });
         }
         this.clearError();
     }

     confirm() {        
        let key = this.state.item.key;
        if(key && Utils.isValidValue(this.state.item.value.name)) {
            let value = {name: this.state.item.value.name};
            DataSource.updateCategoryName(key, value, error => this.setError(error));
        }
    }
  
    setError(error) {
        if(error && error.message){
            this.setState({
                errorMessage : error.message
            });
            
        } else {
            this.setReadOnly();
        }
    }
    
    clearError() {
        this.setState({
                errorMessage : ''
        });
    }

    setReadOnly() {
        this.setState({
            isEditable: false
        });
    }
    
    render() {
        return (
            <div className="item-edit">
            {!this.state.isEditable ? 
                <div className="center-from-top flex space-between">
                    <label>{this.state.item.value.name}</label>
                    <FontAwesome name="pencil" onClick={(event) => {
                                                        Utils.preventDefault(event); 
                                                        this.setState({isEditable : true})
                                                        }}/>
                </div>
            : 
                <div className="center-from-top-input flex space-between">
                        <input type="text" className="input-text" value={this.state.item.value.name} onChange={this.inputChange}/>
                        <div className="edit-icons">
                            <FontAwesome name="check" className="icon-with-padding" 
                                                      onClick={(event) => {
                                                                Utils.preventDefault(event);
                                                                this.confirm();
                                                                }}/>
                            <FontAwesome name="close" className="icon-with-padding" 
                                                      onClick={(event) => {
                                                                Utils.preventDefault(event);
                                                                this.setState({item : this.props.item});
                                                                this.setReadOnly();
                                                                this.clearError();
                                                      }}/>
                        </div>
                    <div className="red">{this.state.errorMessage}</div>
                </div>
            }
        </div>
        );
    }
}

CategoryNameEdit.propTypes = {
    item: PropTypes.object
}

export default CategoryNameEdit;
