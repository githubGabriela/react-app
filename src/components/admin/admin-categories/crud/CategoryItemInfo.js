import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import ColorPopup from '../../../popups/ColorPopup';
import ImagePopup from '../../../popups/image-popup/ImagePopup';

import '../../../../assets/css/General.css';

class CategoryItemInfo extends Component {

    constructor(){
        super();
        this.state={
            showColorPopup: false,
            color: ''
        }
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return true;
        // return this.props.isChecked !== nextProps.isChecked
        //        || this.props.item.value.name !== nextProps.item.value.name
        //        || this.props.item.value.color !== nextProps.item.value.color;
    }

    componentDidMount() {
        this.setState({
            color: this.props.item.value.color
        });
    }

    toggleColorPopup(){
        let toggle = !this.state.showColorPopup;
        this.setState({
            showColorPopup: toggle
        });
    }

    updateCategory(color) {
        if(color && this.props.item.value.color && color !== this.props.item.value.color){
            let value = {color: color};
             DataSource.updateCategoryColor(this.props.item.key, value, result => {
                    this.closePopup();
            });
        }
    }

    closePopup(){
        this.setState({
            showColorPopup: false
        });
    }

    render() {
        return (
        <div className="container-category-img flex">
        
     <ImagePopup categoryName={this.props.item.value.name}/> 
                <div className="center-from-top icon-on-left">
                    <input type="checkbox" checked={this.props.isChecked}
                                           value={this.props.item.value.name}
                                           onChange={(event)=> this.props.checkedItem(event.target.checked, this.props.item)}/>
                </div>
            <div className="item-image category-image"></div>
            <div className="color-bullet center-bullet-from-top"
                            style={{backgroundColor: this.state.color}}
                            onClick={(event)=> {
                                                Utils.preventDefault(event);
                                                this.toggleColorPopup()}}>

            </div>

            <ColorPopup color={this.props.item.value.color}
                            showPopup={this.state.showColorPopup}
                            confirmColorChange={(color)=> this.updateCategory(color)}
                            close={(event) => {this.closePopup(event)}}
                            />

        </div>
        );
    }
}

CategoryItemInfo.propTypes = {
    isChecked: PropTypes.bool,
    item: PropTypes.object,
    checkedItem: PropTypes.func
}

export default CategoryItemInfo;
