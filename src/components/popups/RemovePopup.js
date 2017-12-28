// Usage:
// <RemovePopup items={this.state.items} removePopupOpened={this.state.removePopupOpened}

import React, { Component } from 'react';

import { hocRemovePopup } from './hoc/HocRemovePopup';

class Popup extends Component {
    render() {
        return (
            <div>
                {
                    this.props.categories.map((item) => {
                        return <div key={item.key}>
                            <div>{item.value.name}</div>
                         </div>
                    })
                } 
            </div>
        );
    }
}

const RemovePopup = hocRemovePopup(Popup);

export default RemovePopup;
