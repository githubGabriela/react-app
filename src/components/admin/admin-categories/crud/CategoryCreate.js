// Usage:
// <CategoryCreate/>
import React, { Component } from 'react';

import ColorPopup from '../../../popups/color/ColorPopup';
import CategoryNameCreate from './CategoryNameCreate';

import '../../../../assets/css/General.css';


class CategoryCreate extends Component {
    constructor() {
        super();
        this.state = {
            color: '',
            showPopup: false
        }
        this.openPopup = this.openPopup.bind(this);
        this.colorSelected = this.colorSelected.bind(this);
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

    render() {
        let colorBullet = {
            backgroundColor: this.state.color
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
                    <CategoryNameCreate color={this.state.color}/>
               </div>
            </div>
        );
    }
}

export default CategoryCreate;
