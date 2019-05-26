import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as Constants from '../../../utils/Constants';

import '../../../assets/css/General.css';

export function hocRemovePopup (WrappedComponent) {
    class HocPopup extends React.Component {
        
         render() {
            return (
                <Modal
                ariaHideApp={false}
                isOpen={this.props.removePopupOpened}
                onRequestClose={() => this.props.closeRemovePopup(true)}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header"> {Constants.POPUP.REMOVE_CATEGORIES} </div>

                    <div className="popup-body">
                        <WrappedComponent {...this.props}/>
                        <button className="popup-btn btn-ok" onClick={() => this.props.confirmRemoveItems(true)}>{Constants.POPUP.YES}</button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.closeRemovePopup(true)}>{Constants.POPUP.NO}</button>
                    </div>
                </div>
            </Modal>
        );
        }
    }

    HocPopup.propTypes= {
        removePopupOpened: PropTypes.bool,
        confirmRemoveItems: PropTypes.func,
        closeRemovePopup: PropTypes.func
    }

    return HocPopup;
}

