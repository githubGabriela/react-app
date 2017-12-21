import React, { Component } from 'react';
import Modal from 'react-modal';

import { dbData } from '../../config/constants';


class ItemRemove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item : {
                key : this.props.item.key,
                value : this.props.item.value[this.props.propertyToShow]
            },
            modalIsOpened : false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.remove = this.remove.bind(this);
    }

    openModal(){
        this.setState({modalIsOpened: true});
    }

    closeModal(){
        this.setState({modalIsOpened: false});
    }


    remove(){
        this.removeFromDb(this.state.item.key);
    }
   
    removeFromDb(key) {
        if(key){
            dbData.child(key).remove();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>Remove</button>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpened}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Are you sure do you want to remove this item?"
                >
                    <button onClick={this.remove}>Yes</button>
                    <button onClick={this.closeModal}>No</button>
                    <div>
                        {this.state.item.value}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ItemRemove;
