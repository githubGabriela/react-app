import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../../../assets/css/General.css';

class CategoryRemove extends Component {

    constructor(){
        super();
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(item){
    }    

    render() {
        return (
            <div className="center-from-top icon-on-right">
            <FontAwesome name="close" onClick={()=> {this.removeItem(this.props.item); this.openModal()}}/>
        </div>
        );
    }
}

export default CategoryRemove;
