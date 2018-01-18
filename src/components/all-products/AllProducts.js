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
            collapseAll: false,
            showSettingsFields : false
        }
    }

    // categories with products
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
    
        // header 
        toggleSettingsFields(){
            let show = !this.state.showSettingsFields;
            this.setState({
                showSettingsFields: show
            });
            if(this.state.products.length === 0){
                this.getAllProducts();
            }
            if(show) {
                this.setState({
                    collapseAll: true
                });
                this.showAll(false);
            }
        }

        showAll(show) {
            let categories = this.state.categories;
            categories.forEach( cat => {
                this.fillMapWithProducts(cat.value.name);
                this.showCategory(cat.value.name, show);
            });
        }

        showCategory(catName, show) {
            let map = this.state.mapCategoriesProducts;
            if(map[catName]) {
                let toggle = !map[catName].showSection;
                map[catName].showSection = show ? show : toggle;
                this.setStateMap(map);
            }
        }
        
        setStateMap(map) {
            this.setState({
                mapCategoriesProducts : map
            });
        }

     // accordion sections
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
    
    toggleProducts(event, categoryName) {
       Utils.preventDefault(event);
       this.fillMapWithProducts(categoryName);
       this.showCategory(categoryName);
    }

    toggleCollapseAll(event) {
        let toggle = !this.state.collapseAll;
        this.setState({
            collapseAll: toggle
        });
        this.showAll();
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
                                    onClick={(event) => this.toggleProducts(event, category.value.name)}> 
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
                        <CollapseSections collapseAll={this.state.collapseAll} toggleCollapseAll={(event) => this.toggleCollapseAll(event)}/>
                        <div>
                        <Settings toggleSettings={() => this.toggleSettingsFields()}/>
                        </div>
                    </div>
                    
                    <div>
                        {Constants.TITLES.ALL_PRODUCTS}
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
            </div>
        )
    }
}

export default AllProducts;
