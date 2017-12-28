import React, { Component } from 'react';

import '../../../../assets/css/General.css';

class CategoryItemInfo extends Component {

    constructor(){
        super();
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
    }

    toggleColorPopup(){}


    render() {
        return (
        <div className="container-category-img flex">
                <div className="center-from-top icon-on-left">
                    <input type="checkbox" checked={this.props.isChecked}
                                           value={this.props.item.value.name}
                                           onChange={(event)=> this.props.checkedItem(event.target.checked, this.props.item)}/>
                </div>        
            <div className="item-image category-image"></div>
            <div className="color-bullet center-bullet-from-top" 
                            style={{backgroundColor: this.props.item.value.color}}
                            onClick={()=> this.toggleColorPopup(this.props.item)}>
            </div>
                                  
        </div>
        );
    }
}

export default CategoryItemInfo;
