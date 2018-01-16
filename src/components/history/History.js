// Usage:
// <History/>

import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';
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


    render() {
        let showFilteringSorting = () => {
            return (
                <FilteringAndSorting showComponent={this.state.items.length > 0} 
                                 dataType={Constants.HISTORY}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
            );
        }

        return (
            <div>
                 <div className="section-header">
                  <div className="full-width">
                      <div className="flex space-between">
                          <button onClick={(event) => {Utils.preventDefault(event); DataSource.clearHistory(this.state.items)}}>
                           {Constants.TITLES.CLEAR} </button>
                      </div>
                      <div className="flex space-between">
                          <div className="section-title"> 
                            {Constants.TITLES.HISTORY}
                            {showFilteringSorting()}
                          </div>
                      </div>
                    
                  </div>
              </div>
              {this.state.items.map((item) => {
                  return (
                    <ProductItem key={item.key}
                                 product={item}
                                 color={item.value.color}
                                 addToShoppingList={(item)=> DataSource.addToShoppingList(item)}/>
                  )
                  
             })}
               
            </div>
        );
    }
}

export default History;
