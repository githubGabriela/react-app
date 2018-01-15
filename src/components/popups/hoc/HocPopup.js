// Usage:
// const ConfirmationPopup = hocPopup(
//     Confirmation,
//     (type) => getPopupType() // string E.g.: 'warning'
// );


import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../utils/Constants';


export function hocPopupType (WrappedComponent, type, bodyText) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                type: '',
                bodyText: '',
                modalIsOpened: false
            };
        }
    
        componentDidMount() {
            let body = bodyText ? bodyText() : undefined;
            this.setState({
                type: type(),
                bodyText: body
            })
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

              const popupType = (type) => {
                switch(type){
                    case Constants.POPUP.WARNING:
                        return warningPopup();
                    break;
                    case Constants.POPUP.CONFIRMATION:
                        return confirmationPopup();
                    break;
                    default:
                    break;
                }
            }

            const warningPopup = () => {
            return (
                <div>
                    <div className="popup-header-icon">
                        <FontAwesome name="exclamation-circle" size="lg" className="popup-header-icon"/>
                    </div>
                </div>
                );
            }

            const confirmationPopup = () => {
                return (
                    <div>
                        <div className="popup-header-icon">
                            <FontAwesome name="check" size="lg" className="popup-header-icon"/>
                        </div>
                    </div>
                    );
                }

            const showBodyText = () => {
                return ( <div className="popup-body">
                    {this.state.bodyText ? 
                        <div> {this.state.bodyText} </div>
                    : null
                    }
                </div>);
            }
            return ( 
                <Modal
                style={modalStyle}
                ariaHideApp={false}
                isOpen={this.props.showPopup}>

                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={this.props.closePopup}/>
                    <div className={"popup-header " + this.state.type}>
                       {popupType(this.state.type)}
                    </div>

                    <div className="popup-body">
                        {showBodyText()}
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={this.props.confirmAndClosePopup}> {Constants.POPUP.YES} </button>
                        <button className="popup-btn btn-cancel" onClick={this.props.closePopup}> {Constants.POPUP.NO} </button>
                    </div>
                </div>
            </Modal>
            ); 
            

        }
    }

}