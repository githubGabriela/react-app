import React, { Component } from 'react';

export function hocSiblingsParent(WrappedComponent){
    return class extends React.Component {
        constructor(){
            super();
            this.state={
                colorSibling1: "red",
                colorSibling2: "blue"
            }
            this.changeComponentColor = this.changeComponentColor.bind(this);
        }

        changeComponentColor(){
            this.setState({
                colorSibling1: 'green',
                colorSibling2: 'green'
            })
        }

        render() {
            return (
                <WrappedComponent  colorSibling1={this.state.colorSibling1}
                                   colorSibling2= {this.state.colorSibling2}
                                   changeColor={ () => this.changeComponentColor()}
                                    {...this.props} 
                />
            );
        }
}

}


export default hocSiblingsParent;
