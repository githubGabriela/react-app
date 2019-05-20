// Usage:
// <Remove items={this.state.items} removePopupOpened={this.state.removePopupOpened}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hocRemovePopup } from '../../../popups/hoc/HocRemovePopup';

class Popup extends Component {
    
    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items;
    }

    render() {
        return (
            <div>
                {
                    this.props.items.map((item) => {
                        return <div key={item.key}>
                            <div>{item.value.name}</div>
                         </div>
                    })
                } 
            </div>
        );
    }
}

const Remove = hocRemovePopup(Popup);

Remove.propTypes = {
    items: PropTypes.array
}

export default Remove;
