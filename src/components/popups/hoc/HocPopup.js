// Usage:
// const ConfirmationPopup = hocPopup(
//     Confirmation,
//     (header) => getHeaderContent(), // DOM content
//     (body) => getBodyContent(), // DOM content
//     (type) => getPopupType() // string E.g.: 'warning'
// );


import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../utils/Constants';

export function hocPopup (WrappedComponent, header, body, popupType) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                headerContent: header,
                bodyContent: body,
                type: popupType,
                modalIsOpened: props.showModal
            };
    
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }
    
        componentWillReceiveProps(nextProps) {
            if(this.props != nextProps && nextProps.showModal) {
                this.setState({
                    modalIsOpened: nextProps.showModal
                })
            }
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
                isOpen={this.state.modalIsOpened}>

                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={this.closeModal}/>

                    <div className={"popup-header " + this.state.type()}>
                        {this.state.type() === Constants.POPUP.WARNING ?
                            <div className="warning-icon">
                            <FontAwesome name="exclamation-circle" size="lg" className="warning-icon"/>
                            </div>
                            : null
                        }
                        {this.state.headerContent()}
                    </div>

                    <div className="popup-body">
                        {this.state.bodyContent()}
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={this.closeModal}> {Constants.POPUP.OK} </button>
                        <button className="popup-btn btn-cancel" onClick={this.closeModal}>  {Constants.POPUP.CANCEL} </button>
                    </div>
                </div>
           
            </Modal>
            ); 
            

        }
    }

}