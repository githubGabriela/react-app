// Usage:
// <History/>

import React, { Component } from 'react';

import '../../assets/css/General.css';
import ProductItem from '../products/ProductItem';

class History extends Component {
    render() {
        return (
            <div>
                <div className="section-header">
                    <div className="section-title"> History items </div>
                </div>
                <button>Add to category </button>
                {/* <ProductItem /> */}
            </div>
        );
    }
}

export default History;
