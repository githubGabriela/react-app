import React, { Component } from 'react';

import ItemEdit from './ItemEdit';
import ModalRemove from './ModalRemove';

import '../../assets/css/General.css';

class Items extends Component {
     constructor(props) {
             super(props);
             this.state = {
                 selectedItems: [],
                 modalIsOpened: false,
                 allChecked: false
             }

             this.removeItem = this.removeItem.bind(this);
             this.handleItem = this.handleItem.bind(this);
             this.openModal = this.openModal.bind(this);
             this.checkAllItems = this.checkAllItems.bind(this);
             this.toggleCheckAll = this.toggleCheckAll.bind(this);
         }
    
         toggleCheckAll = (event) => {
            const allChecked = event.target.checked;
            allChecked ? this.checkAllItems() : this.uncheckAllItems();

            this.setState({
                allChecked: !this.state.allChecked
              });
          }
          
          checkAllItems(){
              const items = this.props.items;
              this.props.items.forEach(item => {
                item.isChecked = true; 
              });
              this.setState({
                selectedItems: this.props.items
            });
         }

         uncheckAllItems(){
            this.props.items.forEach(item => {
                item.isChecked = false; 
              });
            this.setState({
                selectedItems: []
            });
         }

         removeItem(item) {
            this.setState({
                selectedItems: [item],
                modalIsOpened: true
            });
        }

         handleItem(isChecked, item) {
           const data = this.state.selectedItems;
                if(isChecked){
                    data.push(item);
                }else{
                    data.forEach(oneItem => {
                        if(oneItem.key === item.key){
                            data.pop(item);
                        }
                    })
                }
                this.setState({
                    selectedItems: data,
                });
        }

        getExistentItem(data, item) {
            for(let i=0; i<data.length; i++){
                let oneItem = data[i];
                if(oneItem.key === item.key) {
                   return oneItem;
                }
            };

            let abc = data.filter(oneItem => {
               item.key === oneItem.key;
            });
            return undefined;
        }

        openModal(){
            this.setState({
                modalIsOpened : true
            });
        }

    render() {
        const {allChecked} = this.state.allChecked;

        return (
            <div>
                    <label>
                        <input type="checkbox"
                                value="allChecked"
                                checked={allChecked}
                                onChange={this.toggleCheckAll}
                        />
                        {this.state.allChecked ? 'Uncheck all' : 'Check all'}
                    </label>
                {
                    this.props.items.map((item) => {
                        return <div className="flex" key={item.key}>
                        {/* TODO - create super component form ModalRemove that will contain the checkbox */}
                            <input type="checkbox" 
                                    value={item.label}
                                    checked={item.isChecked}
                                    onChange={(event)=> { this.handleItem(event.target.checked, item)}}/>
                            <ItemEdit item={item} propertyToShow={this.props.propertyToShow}> 
                            </ItemEdit>
                           
                            <button onClick={()=> {this.removeItem(item); this.openModal()}}> Remove </button>
                            <ModalRemove selectedItems={this.state.selectedItems} 
                                        modalIsOpened={this.state.modalIsOpened}
                                        propertyToShow={this.props.propertyToShow}/>
                        </div>
                    })
                }
                <button onClick={this.openModal}> Remove selected items </button>
            </div>
        );
    }
}

export default Items;