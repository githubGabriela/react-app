import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';

class ColorPopup extends Component {
  
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
                    isOpen={this.props.showPopup}>
                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={() => this.props.close()}/>
                    <div className="popup-header" style={{backgroundColor: this.props.color}}>
                        {Constants.POPUP.CHOOSE_COLOR}
                    </div>
                    <div className="popup-body">
                        <SketchPicker onChange={(event) => this.props.colorChanged(event.hex)}/> 
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={() => this.props.close()}>{Constants.POPUP.OK} </button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.close()}> {Constants.POPUP.CANCEL} </button>
                    </div>
                </div>
                </Modal>
        );
    }
}

ColorPopup.propTypes = {
    showPopup: PropTypes.bool,
    color: PropTypes.string,
    colorChanged: PropTypes.func,
    close: PropTypes.func
}

export default ColorPopup;
