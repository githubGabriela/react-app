import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as DataSource from '../../../../config/DataSource';
import * as Utils from '../../../../utils/Utils';

import { hocRemovePopup } from '../../../popups/hoc/HocRemovePopup';

class RemoveCat extends Component {

    constructor() {
        super();
        this.state = {
            removePopupOpened: false
        }
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount(){
        console.log(this.props.categoriesToRemove);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps != this.props && nextProps.removeCategories) {
            this.openRemovePopup();
        }
        return true;
    }

    openRemovePopup() {
        this.setState({
            removePopupOpened: true,
        });
    }

    closeRemovePopup() {
        this.setState({
            removePopupOpened: false
        });
        this.props.canceled();
    }

    confirm() {
        DataSource.removeCategoriesWithProducts(this.props.categoriesToRemove);
        this.closeRemovePopup();
        this.props.confirmed();
    }


    render() {
        let listProducts = (products) => {
            if (products && products.length > 0) {
                return (
                    <div>
                        <label> Produits </label>
                        {
                            products.map(item => {
                                return <div key={item.key}>
                                    <div>{item.value.name}</div>
                                </div>
                            })
                        }
                    </div>
                );
            }
        }

        return (
            <div>
                {
                    this.props.categoriesToRemove.map((category) => {
                        return <div key={category.key}>
                            <div>Categorie: {category.value.name}</div>
                            {/* {listProducts(category.value.products)} */}
                        </div>
                    })
                }

                {/* { <RemoveCategoriesPopup removePopupOpened={this.state.removePopupOpened}
                    items={this.props.categoriesToRemove}
                    confirmRemoveItems={this.confirm}
                    closeRemovePopup={this.closeRemovePopup} />} */}
            </div>
        );
    }
}

const Remove = hocRemovePopup(RemoveCat);

export default Remove;
