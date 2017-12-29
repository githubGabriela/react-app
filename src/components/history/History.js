// Usage:
// <History/>

import React, { Component } from 'react';

import { dbDataHistory, dbDataShoppingList } from '../../config/constants';
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
        dbDataHistory.orderByChild('category').on('value', snap => {
            let items = [];
            snap.forEach(childSnap => {
                items.push({key: childSnap.key, value: childSnap.val()});
            });
            this.setState({
                items: items
            })
        });
    }

    addToShopping(item){
        if(item && item.value){
            dbDataShoppingList.orderByChild('name').equalTo(item.value.name).once('value', snap=> {
                let exists = snap.val();
                if(!exists){
                    dbDataShoppingList.push(item.value);
                }
            });
        }
    }

    clearHistory(event){
        event.preventDefault();
        this.state.items.forEach( item => {
            dbDataHistory.child(item.key).remove();
        })
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
