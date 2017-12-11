import React, { Component } from 'react';

import ItemEdit from './ItemEdit';
import ItemRemove from './ItemRemove';

import '../../assets/css/General.css';

function List(props) {
    const data = props.data;
    const propertyToShow = props.propertyToShow;
    
    const items = data.map((item) => 
        <div className="flex" key={item.key}>
            <ItemEdit item={item}
                      propertyToShow={propertyToShow}> 
            </ItemEdit>
            <ItemRemove item={item}
                        propertyToShow={propertyToShow}> 
            </ItemRemove>
        </div>
      );
     
      return (
        <ul>
          {items}
        </ul>
      );
    }

class Items extends Component {
    render() {
        return (
            <div>
                <List data={this.props.items} propertyToShow={this.props.propertyToShow}/>
            </div>
        );
    }
}

export default Items;