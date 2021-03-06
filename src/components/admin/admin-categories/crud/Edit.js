// Usage:
// <Edit item={item}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import '../../../../assets/css/General.scss';

class Edit extends Component {
 
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
                         color: this.props.item.value.color
                     }
                 }
             });
         }
         this.clearError();
    }

    confirm() {
        if (Utils.isValidValue(this.state.item.value.name)) {
            DataSource.updateDataCategory(this.props.item, this.state.item, true, error => {
                error ? this.setError(error) : this.setReadOnly();
            });
        }
    }

    setError(error) {
        this.setState({
            errorMessage: error.message ? error.message : ''
        });
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
        let showEditIcon = () => {
            return (
                <div>
                    {this.props.showSettingsFields ? 
                        <FontAwesome name="pencil" className="icon-with-margin" onClick={(event) => {
                                    Utils.preventDefault(event); 
                                    this.setState({isEditable : true})
                                    }}/>
                    : null
                    }
                </div>
            );
        }        

        let showInfo = () => {
            return (
                <div className="center-from-top flex space-between">
                    <label>{this.state.item.value.name}</label>
                   {showEditIcon()}
                </div>
            );
        }

        let showEditField = () => {
            return (
                        <div className="center-from-top-input flex space-between">
                            <input type="text" className="category-input" value={this.state.item.value.name} onChange={this.inputChange}/>
                            <div className="edit-icons">
                                <FontAwesome name="check" className="icon-with-margin" 
                                                        onClick={(event) => {
                                                                    Utils.preventDefault(event);
                                                                    this.confirm();
                                                                    }}/>
                                <FontAwesome name="close" className="icon-with-margin" 
                                                        onClick={(event) => {
                                                                    Utils.preventDefault(event);
                                                                    this.setState({item : this.props.item});
                                                                    this.setReadOnly();
                                                                    this.clearError();
                                                        }}/>
                            </div>
                        </div>
            );
        }

        return (
            <div className="item-edit">
            {!this.state.isEditable ? 
                <div>   
                    {showInfo()}
                </div>
            : 
                <div>
                    {showEditField()}
                    <div className="white">{this.state.errorMessage}</div>
               </div>
            }
        </div>
        );
    }
}

Edit.propTypes = {
    item: PropTypes.object
}

export default Edit;
