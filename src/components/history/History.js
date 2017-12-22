// Usage:
// <History/>

import React, { Component } from 'react';

import '../../assets/css/General.css';
import ProductItem from '../products/ProductItem';
import LastModified from '../data-sync/LastModified';

class History extends Component {
    mockItem={
        key:"key",
        product: {
            label: 'mockProduct'
        },
        color: 'green'
    }
    render() {
        return (
            <div>
                 <div className="section-header">
                  <div className="full-width">
                      <div className="flex space-between">
                          <LastModified />
                      </div>
                      <div className="flex space-between">
                          <div className="section-title"> History items </div>
                      </div>
                  </div>
              </div>
                <ProductItem key={this.mockItem.key} product={this.mockItem.product} 
                             color={this.mockItem.color}/>
            </div>
        );
    }
}

export default History;
