// Usage:
// <AllProducts/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import CollapseSections from '../collapse/CollapseSections';
import CollapseArrows from '../collapse/CollapseArrows';
import ProductItem from './ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';
import ProductsForCategory from './ProductsForCategory';
import { getProducts } from '../../config/DataSource';

const no_category = {
    key: 'no_category', 
    value: {
        name: 'No category',
        color: '#bdc3c7'
    }
};

class AllProducts extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            products: [],
            initialProducts:[],
            mapCategoriesProducts : {},
            showSectionForKey : undefined,
            arrowUp: true
        }
        this.expandSection = this.expandSection.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    getCategories() {
        DataSource.getCategories( categories => {
           this.setState({
               categories: categories
            });
           console.log('categories', categories);
        });
    }

    getProducts() {
        DataSource.getProducts( products => {
            this.setState({
                products: products,
                initialProducts: products
            });
            console.log('products', products);
        });
    }

    expandSection(category) {
        let mapping = this.state.mapCategoriesProducts;
        let name = category.value.name;
        if(!mapping[name] || mapping[name].length <=0 ){
            mapping[name] = this.filterProducts(name);
            this.setState({
                mapCategoriesProducts : mapping
            });
            console.log(this.state.mapCategoriesProducts);
        }
    }

    filterProducts(categoryName){
        return this.state.products.filter( product => product.value.category === categoryName);
    }
   
    render() {
        let showFilteringSorting = () => {
            return (
                <FilteringAndSorting showComponent={this.state.products.length > 0}
                    dataType={Constants.PRODUCTS}
                    hideOrdering={true}
                    items={this.state.products} 
                    initialItems={this.state.initialItems}
                    setFilteredItems = {products => this.setState({products: products})}/>
            );
        }

        return (
            <div>
                <div className="section-header">
                    <div className="section-title"> 
                        <CollapseSections />
                        {Constants.TITLES.ALL_PRODUCTS}
                        {showFilteringSorting()}
                    </div>                  
                </div>
               
                {this.state.categories.map(category => {
                    return (
                    <div className="accordion-header flex space-between" style={{backgroundColor: category.value.color}} key={category.key}> 
                                <div>
                                    <FontAwesome name='smile-o' className="icon-on-left"/>
                                    <label>{category.value.name}</label>
                                </div>
                                <CollapseArrows arrowUp={this.state.arrowUp} expandSection={(event) => this.expandSection(category)}/>
                                <ProductsForCategory products={this.state.mapCategoriesProducts[category.value.name] 
                                                              ? this.state.mapCategoriesProducts[category.value.name]: 
                                                              [] }/>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default AllProducts;
