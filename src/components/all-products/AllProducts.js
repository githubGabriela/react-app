// Usage:
// <AllProducts/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';
import * as DataSource from '../../config/DataSource';
import CollapseSections from '../collapse/CollapseSections';
import CollapseArrows from '../collapse/CollapseArrows';
import ProductItem from './ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';
import ProductsForCategory from './ProductsForCategory';
import { getProductsByCategory } from '../../config/DataSource';
import Settings from '../common/Settings';


class AllProducts extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            categories: [],
            initialProducts:[],
            mapCategoriesProducts : {},
            totalCollapsed: 1,
            showSettingsFields : false
        }
    }

    componentDidMount() {
        this.getCategories();    
    }
      
    getCategories() {
        DataSource.getCategories( categories => {
            this.setState({
                categories: categories
            });
        });
    }

    getAllProducts() {
        DataSource.getProducts( products => {
            this.setState({
                products: products,
                initialProducts: products
            });
        });
    }
    
        toggleSettingsFields(){
            let show = !this.state.showSettingsFields;
            this.setState({
                showSettingsFields: show
            });
            if(this.state.products.length === 0){
                this.getAllProducts();
            }
            if(show) {
                this.showAll(true);
            }
        }

        showAll(show) {
            let categories = this.state.categories;
            categories.forEach( cat => {
                this.fillMapWithProducts(cat.value.name);
                this.showOne(cat.value.name, show);
            });
        }

        showOne(catName, show) {
            let map = this.state.mapCategoriesProducts;
            if(map[catName]) {
                let toggle = !map[catName].showSection;
                if(show === 'toggle'){
                    map[catName].showSection = toggle;
                    this.handleTotalCollapsed(toggle);
                } else {
                    map[catName].showSection = show;
                    this.handleTotalCollapsed(show);
                }
                this.setStateMap(map);
            }
        }
        
        handleTotalCollapsed(show) {
            let total = this.state.totalCollapsed;
            total = show ? ++total : --total;
            this.setState({
                totalCollapsed: total
            });
        }

        setStateMap(map) {
            this.setState({
                mapCategoriesProducts : map
            });
        }

     fillMapWithProducts(catName) {
        let map = this.state.mapCategoriesProducts;
        if(!map[catName] || map[catName].length <=0 ) {
            DataSource.getProductsByCategory(catName, products => {
                map[catName] = products;
                map[catName].showSection = true;
                this.setStateMap(map);
            });
        }
    }
    
    toggleOne(event, categoryName) {
       Utils.preventDefault(event);
       this.fillMapWithProducts(categoryName);
       this.showOne(categoryName, 'toggle');
    }


    render() {
        let showFilteringSorting = () => {
            return (
                <div>
                    { this.state.showSettingsFields ? 
                        <FilteringAndSorting 
                            dataType={Constants.PRODUCTS}
                            hideOrdering={true}
                            items={this.state.products} 
                            initialItems={this.state.initialItems}
                            setFilteredItems = {products => this.setState({products: products})}/>
                    : null
                    }
                </div>
            );
        }

        let mapProducts = (products) => {
            return (
                <div>
                    {products.map(product => {
                            return (
                                <div key={product.key}>
                                    {product.value.name}
                                </div>
                            )
                        })}
                    </div>
            );
        }

        let listProducts = (category) => {
            let products = this.state.mapCategoriesProducts[category];
            let showSection = products  && products.showSection;
            return (
                <div>
                   {products && showSection? 
                        <div> 
                            {mapProducts(products)}
                        </div> 
                   : null
                   }
                </div> 
            );
        }

        let showArrowDown = (categoryName) => {
            return this.state.mapCategoriesProducts[categoryName] && this.state.mapCategoriesProducts[categoryName].showSection;;
        }

        let showItems = () => {
            return (
                <div>
                    {this.state.categories.map(category => {
                        return (
                            <div key={category.key} >
                                <div className="accordion-header flex space-between" 
                                    style={{backgroundColor: category.value.name}} 
                                    onClick={(event) => this.toggleOne(event, category.value.name)}> 
                                            <div>
                                                <FontAwesome name='smile-o' className="icon-on-left"/>
                                                <label>{category.value.name}</label>
                                            </div>
                                            <CollapseArrows arrowDown={showArrowDown(category.value.name)}/>
                                </div>
                                {listProducts(category.value.name)}
                        </div>
                        )
                    })}
                </div>
            );
        }

        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title"> 
                   
                    <div className="flex space-between">
                        <CollapseSections collapseAll={(event) => this.showAll(false)}
                                          expandAll = {(event) => this.showAll(true)}/>
                        <div>
                        <Settings toggleSettings={() => this.toggleSettingsFields()}/>
                        </div>
                    </div>
                    
                    <div>
                        {showFilteringSorting()}
                    </div>
                    </div>                  
                </div>
            );
        }

        return (
            <div>
               {showHeader()}
               {showItems()}
               {this.state.totalCollapsed}
            </div>
        )
    }
}

export default AllProducts;
