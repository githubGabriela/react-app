import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import CreateEditProductPopup from '../../../popups/CreateEditProductPopup';
import * as Utils from '../../../../utils/Utils';

class CreateEdit extends Component {
    constructor() {
        super();
        this.state = {
            productPopupOpened: false,
            errorMessage: ''
        }
        this.openPopup = this.openPopup.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    createProduct(item) {
        DataSource.createProduct(item, error => {
            if (error && error.message) {
                this.setError(error);
            } else {
                // this.clearInput();
                this.props.productCreated(true);
                this.closePopup();
            }
        });
    }

    editProduct(oldItem, item) {
        DataSource.updateProduct(oldItem.key, item, error => { this.setError(error); this.closePopup() });
    }

    openPopup(event) {
        Utils.preventDefault(event);
        this.setState({
            productPopupOpened: true
        });
    }

    closePopup(event) {
        Utils.preventDefault(event);
        if (!this.state.errorMessage) {
            this.setState({
                productPopupOpened: false
            });
        }
    }
    setError(error) {
        let message = error && error.message ? error.message : '';
        this.state.errorMessage = message;
        this.setState({
            errorMessage: message
        });
    }

    clearError() {
        this.setState({
            errorMessage: undefined
        });
    }

    render() {
        let showEdit = () => {
            return (
                <div>
                    {this.props.type === Constants.UTILS.EDIT && this.props.showSettingsFields ?
                        <FontAwesome name="pencil" onClick={(event) => this.openPopup(event)} />
                        : null
                    }
                </div>
            );
        }

        let showCreate = () => {
            return (
                <div>
                    {this.props.type === Constants.UTILS.CREATE ?
                        <button onClick={(event) => this.openPopup(event)}>{this.props.popupTitle}</button>
                        :
                        null
                    }
                </div>
            );
        }


        return (
            <div>
                {showCreate()}
                {showEdit()}
                <CreateEditProductPopup
                    type={this.props.type}
                    errorMessage={this.state.errorMessage}
                    isOpened={this.state.productPopupOpened}
                    itemToEdit={this.props.item}
                    close={(event) => this.closePopup(event)}
                    create={(item) => this.createProduct(item)}
                    edit={(oldItem, item) => this.editProduct(oldItem, item)}
                    clearError={() => this.clearError()} />
            </div>
        );
    }
}

CreateEdit.propTypes = {
    type: PropTypes.string,
    popupTitle: PropTypes.string,
    item: PropTypes.object
}

export default CreateEdit;
