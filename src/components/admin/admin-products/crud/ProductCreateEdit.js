import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import CreateEditProductPopup from '../../../popups/CreateEditProductPopup';

class ProductCreateEdit extends Component {
    constructor() {
        super();
        this.state = {
            productPopupOpened: false
        }
        this.openProductPopup = this.openProductPopup.bind(this);
    }

    openProductPopup(event){
        event.preventDefault();
        this.setState({
            productPopupOpened: true
        });
    }

    closeProductPopup(event){
        this.setState({
            productPopupOpened: false
        });
    }

    render() {
        return (
            <div>
                {this.props.type === 'create' ? 
                    <button onClick={(event) => this.openProductPopup(event)}>{this.props.popupTitle}</button>
                    : 
                    <FontAwesome name="pencil" onClick={(event) => this.openProductPopup(event)}/>
                }
                <CreateEditProductPopup type={this.props.type}
                                        isOpened={this.state.productPopupOpened}
                                        item={this.props.item}
                                        closePopup={(event) => this.closeProductPopup(event)}/>
            </div>
            );
    }
}

ProductCreateEdit.propTypes = {
    type: PropTypes.string,
    popupTitle: PropTypes.string,
    item: PropTypes.object
}

export default ProductCreateEdit;
