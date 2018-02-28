import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../../utils/Utils';
import * as Constants from '../../../utils/Constants';
import ColorHeader from './ColorHeader';

class ColorPopup extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            color: ''
        };
        this.confirm = this.confirm.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.color !== nextProps.color){
           this.setState({color: nextProps.color});
        }
        return true;
    }

    confirm(color) {
        this.props.confirmColorChange(this.state.color);
        this.props.close();
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
                    isOpen={this.props.showPopup}>
                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={() => this.props.close()}/>
                    <ColorHeader color={this.state.color}/>
                    <div className="popup-body">
                        <SketchPicker onChange={(event) => this.setState({color: event.hex})}/> 
                    </div>
                    <div>
                        <button className="popup-btn btn-ok" onClick={(event) => {Utils.preventDefault(event);
                                                                                  this.confirm()}}>
                            {Constants.POPUP.OK} 
                        </button>
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
    confirmColorChange: PropTypes.func,
    close: PropTypes.func
}

export default ColorPopup;
