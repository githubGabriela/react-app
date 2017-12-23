import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import '../../assets/css/General.css';

class ConfirmationPopup extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpened: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpened: true});
    }

    closeModal() {
        this.setState({modalIsOpened: false});
    }

    render() {
        const modalStyle = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              padding               : 0,
              boxShadow            : '0px 7px 22px -2px rgb(105, 104, 105)'
            }
          };

        return (
            <Modal
                    style={modalStyle}
                    ariaHideApp={false}
                    isOpen={this.props.showPopup}
                >
                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={this.closeModal}/>
                    <div className="popup-header warning-color">
                        <div className="warning-icon">
                            <FontAwesome name="exclamation-circle" size="lg" className="warning-icon"/>
                        </div>
                        <label>
                            Edit category "{this.props.item.label }"
                        </label>
                    </div>
                    <div className="popup-body">
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={this.closeModal}> Ok </button>
                        <button className="popup-btn btn-cancel" onClick={this.closeModal}> Cancels </button>
                    </div>
                </div>
                </Modal>
        );
    }
}

export default ConfirmationPopup;
