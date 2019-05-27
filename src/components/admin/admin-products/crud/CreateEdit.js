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
        this.openProductPopup = this.openProductPopup.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    openProductPopup(event) {
        Utils.preventDefault(event);
        this.setState({
            productPopupOpened: true
        });
    }

    closeProductPopup(event) {
        Utils.preventDefault(event);
        this.setState({
            productPopupOpened: false
        });
        this.clearError();
    }

    createProduct(item) {
        this.clearError();
        DataSource.createProduct(item, error => this.setError(error));
    }

    editProduct(oldItem, item) {
        this.clearError();
        DataSource.updateProduct(oldItem.key, item, error => {
            if (error) {
                this.setError(error);
            } else {
                this.closeProductPopup(true);
            }
        });
    }

    setError(error) {
        this.setState({
            errorMessage: error && error.message ? error.message : ''
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
                        <FontAwesome name="pencil" onClick={(event) => this.openProductPopup(event)} />
                        : null
                    }
                </div>
            );
        }

        let showCreate = () => {
            return (
                <div>
                    {this.props.type === Constants.UTILS.CREATE ?
                        <button onClick={(event) => this.openProductPopup(event)}>{this.props.popupTitle}</button>
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
                    close={(event) => this.closeProductPopup(event)}
                    create={(item) => this.createProduct(item)}
                    edit={(oldItem, item) => this.editProduct(oldItem, item)} />
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
