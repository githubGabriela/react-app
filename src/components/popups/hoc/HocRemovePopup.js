import React, { Component } from 'react';

import Modal from 'react-modal';
import '../../../assets/css/General.css';

export function hocRemovePopup (WrappedComponent) {
    return class extends React.Component {
      
         render (){
            return (
                <Modal
                ariaHideApp={false}
                isOpen={this.props.removePopupOpened}
                onRequestClose={() => this.props.closeRemovePopup(true)}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header"> Remove categories </div>

                    <div className="popup-body">
                        <WrappedComponent {...this.props}/>
                        <button className="popup-btn btn-ok" onClick={() => this.props.confirmRemoveItems(true)}>Yes</button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.closeRemovePopup(true)}>No</button>
                    </div>
                </div>
            </Modal>
        );
        }
    }
}

