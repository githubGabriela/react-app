import React, { Component } from 'react';

import * as DataSource from './data';

export function withSubscription (WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props){
            super(props);
            this.handleChange=this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            }

            console.log(this.state.data);
            console.log('wrapped component');
        }

    componentDidMount(){
        DataSource.addChangeListener(this.handleChange);
    } 

    
    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange(){
        this.setState({
            data:selectData(DataSource, this.props)
        });
    }

    render (){
        return <WrappedComponent data={this.state.data} {...this.props} />;
    }
    }
}
