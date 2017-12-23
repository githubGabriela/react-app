import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import '../../assets/css/General.css';
import { hocPopup } from './HocPopup';

class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state= {
            headerContent: ''
        }
        this.v = this.getHeaderContent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps && nextProps.item) {
            this.setState({
                headerContent: nextProps.item.label
            })
        }
      }

    render() {
        const headerTitle = 'Edit category \"'+this.props.item.label +'\"';
        return (
        //   <div headerTitle={this.headerTitle}></div>
        <div header={this.headerTitle}> body </div>
        );
    }
}

export function getHeaderContent() {
    return  <div>
        <label> Edit category </label>
    </div>
}

export function getBodyContent() {
    return  <div className="">
        <div> content </div>
    </div>
}

export function getPopupType(){
    return 'warning';
}


const ConfirmationPopup = hocPopup(
    Confirmation,
    (header) => getHeaderContent(),
    (body) => getBodyContent(),
    (type) => getPopupType()
);


export default ConfirmationPopup;
