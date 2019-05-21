// Usage:
// <ItemCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../../config/DataSource';
import * as Utils from '../../../../../utils/Utils';

import '../../../../../assets/css/General.css';

class NameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errorMessage: ''
        }
        this.clearInput = this.clearInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
       // return this.props.color !== nextProps.color;
       return true;
    }

    createCategory() {
        let category = {
            name: this.state.value,
            color: this.props.color
        }
        if (Utils.isValidValue(this.state.value)) {
            DataSource.createCategory(category, error => {
                error ? this.setError(error) : this.clearInput();
            });
        }
    }

    setError(error) {
        this.setState({
            errorMessage: error.message ? error.message : ''
        });
    }
    
    clearError() {
        this.setState({
            errorMessage: ''
        });
    }

    clearInput() {
        this.setState({
            value: ''
        });
        this.refs.categoryInput.value = '';
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                <form className="flex space-between">
                    <input type="text" ref="categoryInput"
                        className="category-input full-width"
                        defaultValue={this.state.value}
                        placeholder="Create"
                        onChange={(event) => {
                            Utils.preventDefault(event);
                            this.handleChange(event);
                            this.clearError();
                        }}
                    />
                    <div className="edit-icons center-margin-from-top">
                        <FontAwesome name="check" className="icon-with-margin"
                            onClick={(event) => {
                                Utils.preventDefault(event);
                                this.createCategory();
                            }} />
                        <FontAwesome name="close" className="icon-with-margin"
                            onClick={(event) => {
                                Utils.preventDefault(event);
                                this.clearInput();
                                this.clearError();
                            }} />
                    </div>
                </form>
                <div className="red">{this.state.errorMessage}</div>
            </div>
        );
    }
}

NameField.proptypes = {
    color: PropTypes.string
}

export default NameField;
