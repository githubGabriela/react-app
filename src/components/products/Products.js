import React, { Component } from 'react';

import './Products.css';

import CategoryWithProducts from '../categories/CategoryWithProducts';
import { hocCategories } from '../categories/HocCategories';


class AllProducts extends Component {
    defaultHeight = '80px';
    reducedHeight = '40px';

    constructor(props){
        super(props);
        this.state = {
            showSection : {},
            categoryHeight: this.defaultHeight
        }
        this.toggleSection = this.toggleSection.bind(this);
    }

    toggleSection(key){
        let toggle =  {
            key: key,
            show: this.state.showSection[key] ? this.state.showSection[key].show : false
        }
        this.setState({
            showSection : toggle,
            categoryHeight: this.state.showSection.show ? this.defaultHeight : this.reducedHeight
        });

        console.log(this.state);
    }

    render() {
        return (
            <div>
              {this.props.categories.map((category) => {
                  return <div key={category.key} onClick={()=> this.toggleSection(category.key)}>
                            <CategoryWithProducts 
                                               categoryHeight={this.state.categoryHeight}
                                               showSection={this.state.showSection.show}
                                               category={category}/>
                      </div>
             })}
            </div>
        )
    }
}

const Products = hocCategories(AllProducts);

export default Products;
