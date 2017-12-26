// Usage:
// <RemovePopup selectedItems={this.state.selectedItems} modalIsOpened={this.state.modalIsOpened}

import React, { Component } from 'react';
import Modal from 'react-modal';

import { dbDataCategories } from '../../config/constants';

function ShowSelectedItems(props){
    const data = props.selectedItems;

    const renderedItems = data.map((item) => {
        return <div key={item.key}>
            <div>{item.value}</div>
        </div>
        }
      );
    
      return (
        <div>
            <div>{data.length} {renderedItems}</div>
        </div>
    );
}

class RemovePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpened : this.props.modalIsOpened
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.removeSelectedItems = this.removeSelectedItems.bind(this);
    }

    openModal(){
        this.props.modalIsOpened = false;
        this.setState({modalIsOpened: true});
    }

    closeModal(){
        this.setState({modalIsOpened: false});
    }

    
    removeSelectedItems(event) {
        event.preventDefault();
        this.props.selectedItems.forEach(item => {
            this.removeFromDb(item.key);
            this.closeModal();
        });
    }

   
    removeFromDb(key) {
        if(key){
            dbDataCategories.child(key).remove();
        }
    }

    render() {
        return (
        <Modal
            ariaHideApp={false}
            isOpen={this.props.modalIsOpened}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Are you sure do you want to remove this item?"
        >
            <button onClick={this.removeSelectedItems}>Yes</button>
            <button onClick={this.closeModal}>No</button>
            <div>
                {
                    this.props.selectedItems.map((item) => {
                        return <div key={item.key}>
                            <div>{item.label}</div>
                        </div>
                        })
                }
            </div>
        </Modal>
        );
    }
}

export default RemovePopup;
