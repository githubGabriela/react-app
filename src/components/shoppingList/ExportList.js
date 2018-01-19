import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ExportPopup from './ExportPopup';

class ExportList extends Component {
    constructor(){
        super();
        this.state = {
            value: '',
            showPopup : false
        }
        this.copyItems = this.copyItems.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    copyItems({target: {value}}) {
        let list = this.getList();
        let formatedList = this.formatList(list);
        this.setState({value: formatedList, showPopup: true});
      }
    
    getList() {
        let list = {};
        this.props.categories.forEach(category => {
            list[category] = this.filterProducts(this.props.products, category);
        })
        return list;
    }

    formatList(list) {
        let formatedList = '';
        let keys = Object.keys(list);
        keys.forEach( key => {
            if(list[key].length > 0) {
                formatedList += this.capitalizeValue(key) + list[key].join(', ') + '\n';
            }
        });
        return formatedList;
    }

    capitalizeValue(value) {
        return value.charAt(0).toUpperCase() + value.slice(1) + ': ';
    }

    filterProducts(products, categoryName){
        return products.filter( product => {
            return product.value.category === categoryName;
        }).map(product => product.value.name);
    }
    

    render() {
        return (
            <div>
                <FontAwesome name="share-square-o" onClick={this.copyItems}/>
                <ExportPopup showPopup={this.state.showPopup} value={this.state.value} closePopup={() => {this.setState({showPopup: false})}}/>
            </div>
        );
    }
}

ExportList.propTypes = {
    categories: PropTypes.array,
    products: PropTypes.array
}

export default ExportList;

