// Usage:
// <Create/>
import React, { Component } from 'react';

import ColorPopup from '../../../popups/color/ColorPopup';
import FontAwesome from 'react-fontawesome';
import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';

import '../../../../assets/css/General.css';


class Create extends Component {
    constructor() {
        super();
        this.state = {
            name : '',
            color: '',
            showPopup: false,
            errorMessage: ''
        }
        this.openPopup = this.openPopup.bind(this);
        this.colorSelected = this.colorSelected.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount(){
        this.setState({
            color: '#372883'
        });
    }

    openPopup(){
        this.setState({
            showPopup: true
        })
    }
    closePopup(){
        this.setState({
            showPopup: false
        });
    }

    colorSelected(color){
        this.setState({
            color: color
        });
    }

    create() {
        let category = {
            name: this.state.name,
            color: this.state.color
        };
        if (Utils.isValidValue(category.name)) {
            DataSource.createCategory(category, error => {
                error && error.message ? this.setError(error.message) : this.clearInput();
            });
        }
    }

    setError(message) {
        this.setState({
            errorMessage: message
        });
    }
    
    clearError() {
        this.setState({
            errorMessage: ''
        });
    }

    handleInput(event) {
        this.setState({ name: event.target.value });
    }

    clearInput() {
        this.setState({
            value: ''
        });
        this.refs.categoryInput.value = '';
    }

    render() {
        let colorBullet = {
            backgroundColor: this.state.color
        }

        let showInput = () => {
            return (
                <div>
                    <form className="flex space-between">
                        <input type="text" ref="categoryInput"
                            className="category-input full-width"
                            placeholder="Create"
                            onChange={(event) => {
                                Utils.preventDefault(event);
                                this.handleInput(event);
                                this.clearError();
                            }}
                        />
                        <div className="edit-icons center-margin-from-top">
                            <FontAwesome name="check" className="icon-with-margin"
                                onClick={(event) => {
                                    Utils.preventDefault(event);
                                    this.create();
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

        return (
            <div className="flex space-between">
               <div className="color-picker-container">
                    <div className="color-bullet center-margin-from-top" style={colorBullet} onClick={this.openPopup}></div>
                    <ColorPopup color={this.state.color}
                                showPopup={this.state.showPopup} 
                                confirmColorChange={(color)=> this.colorSelected(color)} 
                                close={() => {this.closePopup()}}/>
               </div>
               <div className="full-width">
                {showInput()}
               </div>
            </div>
        );
    }
}

export default Create;
