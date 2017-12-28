// Usage:
// <RemovePopup items={this.state.items} removePopupOpened={this.state.removePopupOpened}

import React, { Component } from 'react';
import Modal from 'react-modal';

import '../../assets/css/General.css';

class RemovePopup extends Component {
   
    render() {
        return (
        <Modal
            ariaHideApp={false}
            isOpen={this.props.removePopupOpened}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={() => this.props.closeRemoveModal(true)}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header"> Remove categories </div>
                    <div className="popup-body">
                            {
                                this.props.items.map((item) => {
                                    return <div key={item.key}>
                                        <div>{item.value.name}</div>
                                    </div>
                                    })
                            } 
                </div>
                        
                <button className="popup-btn btn-ok" onClick={() => this.props.confirmRemoveItems(true)}>Yes</button>
                <button className="popup-btn btn-cancel" onClick={() => this.props.closeRemoveModal(true)}>No</button>
            </div>
        </Modal>
        );
    }
}

export default RemovePopup;
