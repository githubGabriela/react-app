import React, { Component } from 'react';

import { dbDataCategories, dbDataProducts } from '../../../config/constants';

export function hocItems (WrappedComponent) {
    return class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                categories : [],
                products: [],
                selectedCategory: {key : '', value: ''}
            }
            this.categoryChanged = this.categoryChanged.bind(this);
        }

        componentDidMount() {
            this.getCategories();
            this.getProducts();
        }
        
        getCategories() {
            dbDataCategories.on('value', snap => {
                const items = [];
                snap.forEach( childSnap => {
                    items.push({ key: childSnap.key, value: childSnap.val()});
                });
                this.setState({
                    categories : items,
                    selectedCategory: items[0]
                });
            });
        }

        getProducts() {
            dbDataProducts.on('value', snap => {
                const items = [];
                snap.forEach( childSnap => {
                    items.push({ key: childSnap.key, value: childSnap.val()});
                });
                this.setState({
                    products : items
                });
            });
        }


        categoryChanged(event) {
            this.setState({
                    selectedCategory:  {
                        key: event.value , 
                        value: event.label}
                });
        }

         render (){
            return <WrappedComponent categories={this.state.categories} 
                                     products={this.state.products}
                                     selectedCategory={this.state.selectedCategory} 
                                     categorySelected= {(item) => this.categoryChanged(item)}
                                     {...this.props} />;
        }
    }
}

