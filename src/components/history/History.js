// Usage:
// <History/>

import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';
import ProductItem from '../all-products/ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';

class History extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            initialItems: [],
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
                items: items,
                initialItems: items
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
                          <button onClick={(event) => this.clearHistory(event)}> {Constants.TITLES.CLEAR} </button>
                      </div>
                      <div className="flex space-between">
                          <div className="section-title"> {Constants.TITLES.HISTORY}</div>
                      </div>
                    
                  </div>
              </div>
              <FilteringAndSorting showComponent={this.state.items.length > 0} 
                                 dataType={Constants.HISTORY}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
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
