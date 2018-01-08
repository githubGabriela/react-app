import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import '../../../assets/css/General.css';

class Header extends Component {
    
    shouldComponentUpdate(nextProps) {
        return this.props.allIsChecked !== nextProps.allIsChecked
               || this.props.title !== nextProps.title
               || this.props.checkedItems !== nextProps.checkedItems
    }

    render() {
        return (
        <div className="section-header">
            <div className="icon-on-left">
                <input type="checkbox" value="allChecked" 
                    checked={this.props.allIsChecked}
                    onChange={(event) => this.props.checkedAllItems(event.target.checked)}/> 
            </div>
            <div className="section-title"> {this.props.title} </div>
            <div className="icon-on-right">
                { (this.props.allIsChecked || this.props.checkedItems.length > 0) ? 
                    <FontAwesome name="close" onClick={()=> this.props.removeIconClicked(true)}/>
                : null
                }
            </div>
        </div>
        );
    }
}

Header.propTypes = {
    allIsChecked: PropTypes.bool,
    title: PropTypes.string,
    checkedItems: PropTypes.array,
    checkedAllItems: PropTypes.func,
    removeIconClicked: PropTypes.func
}

export default Header;
