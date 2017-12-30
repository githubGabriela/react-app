// Usage:
// <ProductNameCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import { hocItemNameCreate } from '../../hoc/HocItemNameCreate';

class ProductName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: 'No category',
            color: ''
        }
        this.pushProductToDb = this.pushProductToDb.bind(this);
    }

    componentWillReceiveProps(props, nextProps){
        if(props){
            if(props.categoryForProduct && props.categoryForProduct !== this.state.category){
                this.setState({
                    category: props.categoryForProduct
                });
                this.getColor(props.categoryForProduct);
            }
            if(props.nameToUpdate && props.nameToUpdate !== this.state.nameToUpdate){
                this.setState({
                    nameToUpdate: props.nameToUpdate
                })
            }
        }
    }

    pushProductToDb(event) {
        event.preventDefault();
        let product =  { 
            name:this.state.nameToUpdate,
            category:this.state.category,
            color: this.state.color
        };
        DataSource.addProduct(product); 
   }

    getColor(categoryName) {
        DataSource.getColorForCategory(categoryName, (color) => {
            this.setState({
                color: color
            })
        });
}
   
    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding" onClick={this.pushProductToDb}/>
        );
    }
}


const ProductNameCreate = hocItemNameCreate(
    ProductName,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
    
);

export default ProductNameCreate;
