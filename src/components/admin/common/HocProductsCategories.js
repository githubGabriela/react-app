import React, { Component } from 'react';
import * as DataSource from '../../../config/DataSource';

export function hocProductsCategories(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
        }
        
     removeConfirmed() {
        DataSource.removeProducts(this.state.checkedItems);
        this.resetCheckboxes();
        this.hideRemovePopup();
    }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}