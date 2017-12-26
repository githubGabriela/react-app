import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export function hocItemNameEdit (WrappedComponent, getInitialInput){
    return class extends React.Component {
        constructor(props){
            super(props);
     
             this.state = {
                 item : props.item,
                 isEditable : false,
                 showConfirmPopup: false
             };
     
            this.edit = this.edit.bind(this);
            this.inputChange = this.inputChange.bind(this);
            this.resetItem = this.resetItem.bind(this);
            this.setReadOnly = this.setReadOnly.bind(this);
         }
     
         edit(event){
             event.preventDefault();
             this.setState({
                 isEditable : true
             });
         }
     
         inputChange(event){
             let updatedName = event.target.value;
             if(updatedName !== this.state.item.value.name && this.isValidLabel(this.state.item.value.name)){
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
         }
     
         showConfirmationPopup() {
             this.setState({
                 showConfirmPopup: true
             });
         }
     
        resetItem(event) {
             event.preventDefault();
             this.setState({
                 item : this.props.item
             });
             this.setReadOnly();
         }
     
         setReadOnly(){
             this.setState({
                 isEditable: false
             });
         }
     
         isValidLabel(label){
             return label && label.trim().length > 0;
         }
     

    render (){
        return (
            <div className="item-edit">
                {!this.state.isEditable ? 
                    <div className="center-from-top flex space-between">
                            <label>{this.state.item.value.name}</label>
                            <FontAwesome name="pencil" onClick={this.edit}/>
                    </div>
                : 
                    <div className="center-from-top-input flex space-between">
                            <input type="text" className="input-text" value={this.state.item.value.name} onChange={this.inputChange}/>
                            <div className="edit-icons">
                                <span onClick={this.setReadOnly}>
                                    <WrappedComponent nameToUpdate={this.state.item.value.name} {...this.props} onClick={this.reset}/>
                                </span>
                                <FontAwesome name="close" className="icon-with-padding" onClick={this.resetItem}/>
                            </div>
                    </div>
                }

                {/* { this.state.showConfirmPopup ? 
                        <div>confirmed
                             <ConfirmationPopup item={this.props.item} showPopup={this.state.showConfirmPopup} />
                        </div>
                    : <div>not confirmed </div>
                } */}
            </div>
            )
        }
    }

}



export default hocItemNameEdit;
