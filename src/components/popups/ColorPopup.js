import React, { Component } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import FontAwesome from 'react-fontawesome';

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
                        Choose a color
                    </div>
                    <div className="popup-body">
                        <SketchPicker onChange={(event) => this.props.colorChanged(event.hex)}/> 
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={() => this.props.close()}> Ok </button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.close()}> Cancel </button>
                    </div>
                </div>
                </Modal>
        );
    }
}

export default ColorPopup;
