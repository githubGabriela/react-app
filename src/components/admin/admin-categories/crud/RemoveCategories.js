import React, { Component } from 'react';

import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';
import RemovePopup from '../../../popups/RemovePopup';

class RemoveCategories extends Component {

    constructor() {
        super();
        this.state = {
            removePopupOpened: false

        }
        this.confirm = this.confirm.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps != this.props && nextProps.removeCategories){
            this.openRemovePopup();
        }
        return true;
    }

    openRemovePopup() {
        this.setState({
            removePopupOpened : true,
        });
    }  

    closeRemovePopup() {
        this.setState({
            removePopupOpened : false
        });
        this.props.canceled();
    }

    confirm() {
        DataSource.removeCategories(this.props.itemsForRemovePopup); 
        this.closeRemovePopup();
        this.props.confirmed();
    }


    render() {
        return (
        <RemovePopup removePopupOpened={this.state.removePopupOpened} 
            items={this.props.itemsForRemovePopup}
            confirmRemoveItems = {this.confirm}
            closeRemovePopup={this.closeRemovePopup}/> 
        );
    }
}

export default RemoveCategories;
