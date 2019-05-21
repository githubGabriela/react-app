import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Utils from '../../../../utils/Utils';
import * as DataSource from '../../../../config/DataSource';
import ColorPopup from '../../../popups/color/ColorPopup';
import ImagePopup from '../../../popups/image-popup/ImagePopup';

import '../../../../assets/css/General.css';

class Item extends Component {

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
    }

    componentDidMount() {
        this.setState({
            color: this.props.item.value.color
        });
    }

    toggleColorPopup() {
        let toggle = !this.state.showColorPopup;
        this.setState({
            showColorPopup: toggle
        });
    }

    updateCategory(color) {
        this.setState({ color: color });
        const item = {
            key: this.props.item.key,
            value: {
                name: this.props.item.value.name,
                color: color
            }
        }
        DataSource.updateDataCategory(this.props.item, item, false, error => {
            error ? this.setError(error) : this.closePopup();
        });
    }


    setError(error) {
        this.setState({
            errorMessage: error.message ? error.message : ''
        });
    }


    closePopup(){
        this.setState({
            showColorPopup: false
        });
    }

    render() {
        let showCheckbox = () => {
            return (
                <div>
                    {this.props.showSettingsFields ? 
                      <div className="center-from-top icon-on-left">
                        <input type="checkbox" checked={this.props.isChecked}
                                           value={this.props.item.value.name}
                                           onChange={(event)=> this.props.checkedItem(event.target.checked, this.props.item)}/>
                     </div>
                    : null
                    }
                </div>
            );
        }

        return (
        <div className="container-category-img flex">
        
     {/* <ImagePopup categoryName={this.props.item.value.name}/>  */}
            {showCheckbox()}
            <div className="item-image category-image"></div>
            <div className="color-bullet center-bullet-from-top"
                            style={{backgroundColor: this.state.color}}
                            onClick={(event)=> {
                                                Utils.preventDefault(event);
                                                this.toggleColorPopup()}}>

            </div>
            <ColorPopup color={this.state.color} 
                            showPopup={this.state.showColorPopup}
                            confirmColorChange={(color)=> this.updateCategory(color)}
                            close={(event) => {this.closePopup(event)}}
                            />

             <div className="white">{this.state.errorMessage}</div>               
        </div>
        );
    }
}

Item.propTypes = {
    isChecked: PropTypes.bool,
    item: PropTypes.object,
    checkedItem: PropTypes.func
}

export default Item;
