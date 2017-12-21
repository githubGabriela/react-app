import React, { Component } from 'react';
import { dbData } from '../../config/constants';
import FontAwesome from 'react-fontawesome';

import '../../assets/css/General.css';

class ItemEdit extends Component {
    constructor(props){
       super(props);

        const propsItem = {
            key: this.props.item.key,
            label : this.props.item.label
        };

        this.state = {
            item : propsItem,
            initialItem: propsItem,
            isEditable : false
        };

       this.edit = this.edit.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.confirm = this.confirm.bind(this);
       this.updateCategory = this.updateCategory.bind(this);
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
                label: event.target.value,
            
            }
        });
    }

    confirm(event) {
        event.preventDefault();
        if(this.isValidLabel(this.state.item.label)){
            this.setReadOnly();
            if(this.props.propertyToShow === 'category'){
                this.updateCategory();
            }else{
                this.updateProduct();
            }
        }
    }

    updateCategory(){
        let key = this.state.item.key;
        if(key){
            dbData.child(key).set({category : this.state.item.label}); 
        }
    }

    updateProduct(){
        let key = this.state.item.key;
        if(key){
            dbData.child(key).set({product : this.state.item.label}); 
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

    isValidLabel(label){
        return label.trim().length > 0;
    }

    render() {
        return (
            <div className="item-edit">
                {!this.state.isEditable ? 
                    <div className="center-from-top flex space-between">
                            <label>{this.state.item.label}</label>
                            <FontAwesome name="pencil" onClick={this.edit}/>
                    </div>
                : 
                    <div className="center-from-top-input flex space-between">
                            <input type="text" className="input-text" value={this.state.item.label} onChange={this.handleChange}/>
                            <div className="edit-icons">
                                <FontAwesome name="check" onClick={this.confirm}/>
                                <FontAwesome name="close" onClick={this.resetItem}/>
                            </div>
                    </div>
                }
            </div>
        );
    }
}

export default ItemEdit;
