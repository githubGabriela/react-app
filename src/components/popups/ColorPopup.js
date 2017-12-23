import React, { Component } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import FontAwesome from 'react-fontawesome';

class ColorPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#372883',
            modalIsOpened : props.showPopup
        }
        this.colorChanged = this.colorChanged.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps && nextProps.color) {
            this.setState({
                color: nextProps.color
            })
        }
      }

    colorChanged(event){
        this.setState({
            color: event.hex
        });
    }

    openModal(){
        this.setState({modalIsOpened: true});
    }

    closeModal(){
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
                    isOpen={this.props.showPopup}>
                <div className="popup-container">
                    <FontAwesome name="close" className="popup-close-icon" onClick={this.closeModal}/>
                    <div className="popup-header" style={{backgroundColor: this.state.color}}>
                        Choose a color
                    </div>
                    <div className="popup-body">
                        <SketchPicker onChange={this.colorChanged}/> 
                    </div>
                    <div className="popup-footer">
                        <button className="popup-btn btn-ok" onClick={this.closeModal}> Ok </button>
                        <button className="popup-btn btn-cancel" onClick={this.closeModal}> Cancel </button>
                    </div>
                </div>
                </Modal>
        );
    }
}

export default ColorPopup;
