import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as Constants from '../../../../utils/Constants';

class RemoveCategoriesPopup extends Component {
    render() {

        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.showRemovePopup}
                onRequestClose={() => this.props.canceled(true)}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header"> {Constants.POPUP.REMOVE_CATEGORIES} </div>
                    {
                        this.props.items.length === 1 ?
                            <div>
                                Remove category <b>{this.props.items[0].value.name}</b> and all its products?
                            </div>
                            :
                            <div>
                                Remove the folowing categories and all their products?
                            {
                                    this.props.items.map((item) => {
                                        return <div key={item.key}>
                                            <div><b>{item.value.name}</b> </div>
                                        </div>
                                    })
                                }
                            </div>
                    }

                    <div className="popup-body">
                        <button className="popup-btn btn-ok" onClick={() => this.props.confirmed(true)}>{Constants.POPUP.YES}</button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.canceled(true)}>{Constants.POPUP.NO}</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

RemoveCategoriesPopup.propTypes = {
    confirmed: PropTypes.func,
    canceled: PropTypes.func
}

export default RemoveCategoriesPopup;