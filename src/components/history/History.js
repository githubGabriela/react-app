// Usage:
// <History/>

import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';

import ProductItem from '../products/ProductItem';
import LastModified from '../data-sync/LastModified';

import '../../assets/css/General.css';

class History extends Component {
    constructor() {
        super();
        this.state={
            items: []
        }
        this.addToShopping = this.addToShopping.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
    }

    componentDidMount() {
      this.getHistory();
    }

    getHistory(){
        DataSource.getHistory( items => {
            this.setState({
                items: items
            });
        });
    }

    addToShopping(item) {
        DataSource.addToShoppingList(item);
    }

    clearHistory(event) {
        event.preventDefault();
        DataSource.clearHistory(this.state.items);
    }

    render() {
        return (
            <div>
                 <div className="section-header">
                  <div className="full-width">
                      <div className="flex space-between">
                          <LastModified />
                          <button onClick={(event) => this.clearHistory(event)}> Clear </button>
                      </div>
                      <div className="flex space-between">
                          <div className="section-title"> History of shopping list </div>
                      </div>
                    
                  </div>
              </div>
              {this.state.items.map((item) => {
                  return (
                    <ProductItem key={item.key}
                                 product={item}
                                 color={item.value.color}
                                 addToShoppingList={(item)=> this.addToShopping(item)}/>
                  )
                  
             })}
               
            </div>
        );
    }
}

export default History;
