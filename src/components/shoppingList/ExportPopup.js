import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { hocPopupType } from '../popups/hoc/HocPopup';
import * as Constants from '../../utils/Constants';

class ExportPopup extends Component {
    
    constructor() {
        super();
        this.state = {
            copied: false,
            modalIsOpened: false
        }
        this.copy = this.copy.bind(this);
        this.close = this.close.bind(this);
    }

    copy() {
        this.setState({copied: true});
    }

    close() {
        this.setState({copied: false});
        this.props.closePopup();
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

          let showBody = () => {
              return (
                <div>
                    <CopyToClipboard text={this.props.value} onCopy={this.copy}>
                            <button>Copy to clipboard</button>
                    </CopyToClipboard>
                    <div>
                        {this.state.copied ? 
                            <div> Copied </div> 
                        : null
                        }
                    </div>
                </div>
              );
          }

        return (
            <Modal
            style={modalStyle}
            ariaHideApp={false}
            isOpen={this.props.showPopup}>

            <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={this.close}/>
                    <div className="popup-header confirmation">
                        Export shopping list
                    </div>

                    <div className="popup-body">
                        {showBody()}
                    </div>
                    <div>
                        <button className="popup-btn btn-cancel" onClick={this.close}> Close </button>
                    </div>
                </div>

           
            </Modal>
            );
    }
}

export default ExportPopup;
