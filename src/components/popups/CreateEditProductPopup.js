import React, { Component } from 'react';
import PropType from 'prop-types';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';
import DropdownCategories from '../admin/admin-categories/list/DropdownCategories';

import '../../assets/css/General.css';

class CreateEditProductPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: undefined,
            selectedCategory: undefined,
            itemToEdit: {}
        }
        this.clearInput = this.clearInput.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.categoryChanged = this.categoryChanged.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillReceiveProps(props) {
        if (props) {
            if (props.itemToEdit) {
                this.setState({
                    itemToEdit: props.itemToEdit,
                    selectedCategory: props.itemToEdit.value.category
                });
            }
        }
    }
    inputChange(event) {
        if (event && event.target.value) {
            this.setState({ name: event.target.value });
            this.props.clearError();
        }
    }

    clearInput(event) {
        Utils.preventDefault(event);
        this.setState({
            name: ''
        });
    }

    categoryChanged(category) {
        this.setState({ category: category.value });
    }

    confirm(event) {
        Utils.preventDefault(event);
        let item = {
            name: this.state.name
        }
        if (this.state.category) {
            item['category'] = this.state.category;
        }
        if (this.props.type === Constants.UTILS.CREATE) {
            this.props.create(item);
        } else {
            this.props.edit(this.state.itemToEdit, item);
        }
    }

    render() {
        return (
            <Modal ariaHideApp={false} isOpen={this.props.isOpened}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header">
                        {this.props.type === Constants.UTILS.CREATE ?
                            <label> Create product </label>
                            :
                            <label> Edit product </label>
                        }
                    </div>

                    <div className="popup-body">
                        {/* {<DropdownCategories selectedCategory={this.state.selectedCategory}
                                            categorySelected={(category) => this.categoryChanged(category)}/>} */}
                        <div className="flex space-between">
                            Name: <input type="text" value={this.state.name}
                                onChange={this.inputChange} />
                        </div>

                        <div> Photo </div>

                        {this.props.errorMessage ?
                            <div className="red">{this.props.errorMessage} </div>
                            : null
                        }
                        <button className="popup-btn btn-ok" onClick={(event) => this.confirm(event)}>{Constants.POPUP.YES}</button>
                        <button className="popup-btn btn-cancel" onClick={() => this.props.close()}>{Constants.POPUP.NO}</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

CreateEditProductPopup.propTypes = {
    itemToEdit: PropType.object,
    type: PropType.string,
    isOpened: PropType.bool,
    errorMessage: PropType.string
}

export default CreateEditProductPopup;
