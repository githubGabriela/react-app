import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export function hocItemsList (WrappedComponent, getInitialInput){
    return class extends React.Component {

        render(){
            return (
            <div>
                {/* Header */}
            
            
                <WrappedComponent nameToUpdate={this.state.item.value.name} {...this.props}/>
            </div>
            )
        }
    }
}

export default hocItemsList;