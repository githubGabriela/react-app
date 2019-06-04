import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as Constants from '../../../utils/Constants';

class RemovePopup extends Component {
    render() {
        let showTitleForHeader = () => {
            return <div className="popup-remove-header">
                {this.props.popupType === Constants.TITLES.CATEGORIES ?
                    <div>{Constants.POPUP.REMOVE_CATEGORIES} </div>
                    :
                    <div>{Constants.POPUP.REMOVE_PRODUCTS} </div>
                }
            </div>
        }

        let showTitleOneItem = () => {
            return <div>
                {this.props.popupType === Constants.TITLES.CATEGORIES ?
                    <div>
                        Remove category <b>{this.props.items[0].value.name}</b> and all its products?
                </div>
                    :
                    <div>
                        Remove product <b>{this.props.items[0].value.name}</b>?
                </div>
                }
            </div>
        };

        let showTitleMultipleItems = () => {
            return <div>
                {this.props.popupType === Constants.TITLES.CATEGORIES ?
                    <div>Remove the folowing categories and all their products? </div>
                    :
                    <div>Remove the folowing products? </div>
                }
                {
                    this.props.items.map((item) => {
                        return <div key={item.key}>
                            <div><b>{item.value.name}</b> </div>
                        </div>
                    })
                }
            </div>
        };

        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.showRemovePopup}
                onRequestClose={() => this.props.canceled(true)}>

                <div className="popup-remove-container">
                    {showTitleForHeader()}
                    {
                        this.props.items.length === 1 ?
                            <div>{showTitleOneItem()}</div>
                            :
                            <div>{showTitleMultipleItems()}</div>
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

RemovePopup.propTypes = {
    confirmed: PropTypes.func,
    canceled: PropTypes.func,
    popupType: PropTypes.string
}

export default RemovePopup;