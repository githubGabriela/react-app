import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export function hocCategoriesProductsList (WrappedComponent, getInitialInput){
    return class extends React.Component {

        render(){
            return (
            <div>
                <WrappedComponent {...this.props}/>
            </div>
            )
        }
    }
}

export default hocCategoriesProductsList;