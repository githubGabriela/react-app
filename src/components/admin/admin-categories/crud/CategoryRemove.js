import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataCategories } from '../../../../config/constants';

import '../../../../assets/css/General.css';

class CategoryRemove extends Component {

    constructor(){
        super();
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(item){
        if(item.key){
            dbDataCategories.child(item.key).remove();
        }
    }    

    render() {
        return (
            <div className="center-from-top icon-on-right">
            { this.props.showRemoveButton ? 
                <FontAwesome name="close" onClick={()=> {this.removeItem(this.props.item)}}/>
                : null
            }
        </div>
        );
    }
}

export default CategoryRemove;
