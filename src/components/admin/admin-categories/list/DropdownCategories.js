// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { dbDataCategories } from '../../../../config/constants';

class DropdownCategories extends Component {
    constructor(){
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        dbDataCategories.on('value', snap => {
            const items = [];
            snap.forEach( childSnap => {
                items.push({ value: childSnap.key, label: childSnap.val().name});
            });
            this.setState({
                categories: items
            })
        });
    }


    render() {
        return (
            <Dropdown options={this.state.categories}
                      onChange={(event) => this.props.categorySelected(event)} 
                      placeholder="Select a category"/>
        );
    }
}



export default DropdownCategories;