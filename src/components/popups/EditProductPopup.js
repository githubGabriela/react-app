import React, { Component } from 'react';

import Modal from 'react-modal';
import '../../assets/css/General.css';

class EditProductPopup extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: props.item
        }

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(event){
        console.log(event.target.value);
    }

    render() {
        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.isOpened}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header">
                        <label>Edit product {this.props.item.value.name}</label>
                    </div>

                    <div className="popup-body">
                        <div> Name: <input type="text" value={this.state.item.value.name} 
                                    onChange={this.inputChange}/> </div>

                        <button className="popup-btn btn-ok" onClick={() => this.props.confirmEdit(true)}>Yes</button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.closePopup(true)}>No</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default EditProductPopup;
