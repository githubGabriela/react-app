import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';

export function hocItemNameCreate (WrappedComponent, getInitialInput){
    return class extends React.Component {
        constructor(props) {
            super(props);
             this.state = {
                 input : getInitialInput()
             }
    
            this.inputChange = this.inputChange.bind(this);
            this.reset = this.reset.bind(this);
        }

        inputChange(event) {
            event.preventDefault();
            let value = event.target.value;
            if(this.isValidValue(value)){
                this.setState({
                    input : {
                        key : this.state.input.key,
                        value: value
                    }
                })
            }
        }
        
        isValidValue(value){
            return value.trim().length > 0;
        }
            
        reset(event) {
            event.preventDefault();
            this.setState({ 
                input : getInitialInput()
            });
        }

    render (){
        return (
            <div> 
                <form className="flex space-between"> 
                    <textarea className="input-text input-text-full"
                        autoFocus
                        value= {this.state.input.value}
                        onChange = {this.inputChange}>
                    </textarea>
                    <div className="edit-icons-textarea center-margin-from-top">
                    <span onClick={this.reset}>
                        <WrappedComponent nameToUpdate={this.state.input.value} {...this.props} onClick={this.reset}/>
                    </span>
                    <FontAwesome name="close" className="icon-with-padding" onClick={this.reset}/>
                    </div>
                </form>
            </div>
            )
        }
    }

}



export default hocItemNameCreate;
