import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../../../assets/css/General.css';

class CategoriesHeader extends Component {

    render() {
        return (
        <div className="section-header">
            <div className="icon-on-left">
                <input type="checkbox" value="allChecked" 
                    checked={this.props.isChecked}
                    onChange={(event) => this.props.checkedAllItems(event.target.checked)}/> 
            </div>
            <div className="section-title"> Categories </div>
            <div className="icon-on-right">
                {this.props.isChecked? 
                    <FontAwesome name="close" onClick={()=> this.props.removeIconClicked(true)}/>
                : null
                }
            </div>
        </div>
        );
    }
}

export default CategoriesHeader;
