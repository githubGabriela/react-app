import React, { Component } from 'react';

import { dbData } from '../../config/constants';

export function hocCategories (WrappedComponent) {
    return class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                categories : [],
                selectedCategory: undefined
            }
            this.categoryChanged = this.categoryChanged.bind(this);
        }

        componentDidMount() {
            this.getCategories();
        }
        
        getCategories() {
            dbData.on('value', snap => {
                const items = [];
                snap.forEach( childSnap => {
                    let item = { key: childSnap.key, label: childSnap.val().category, value: childSnap.key, color: childSnap.val().color, products:[]};
                    childSnap.forEach(itemWithProduct => {
                        if(itemWithProduct.val().product){
                            item['products'].push({key: itemWithProduct.key, label: itemWithProduct.val().product, value: itemWithProduct.key, product: itemWithProduct});
                        }
                    })
                    items.push(item);
                });
                this.setState({
                    categories : items,
                    selectedCategory: items[0]
                });
                console.log(this.state.categories);
            });
        }

        categoryChanged(category) {
            this.props.categories.forEach( item => {
                if(item.value === category.value){
                    this.setState({
                        selectedCategory :item
                    });
                }
            });
        }

         render (){
            return <WrappedComponent categories={this.state.categories} 
                                     selectedCategory={this.state.selectedCategory} 
                                     {...this.props} />;
        }
    }
}

