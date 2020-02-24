// Usage:
// <History/>

import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';
import ProductItem from '../all-products/ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';
import Settings from '../common/Settings';

import '../../assets/css/General.scss';

class History extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            initialItems: [],
            showSettingsFields: false
        }
    }

    componentDidMount() {
      this.getHistory();
    }

    getHistory(){
        DataSource.getHistory( items => {
            this.setState({
                items: items,
                initialItems: items
            });
        });
    }

    toggleSettingsFields(){
        let toggle = !this.state.showSettingsFields;
        this.setState({
            showSettingsFields: toggle
        });
    }


    render() {
        let showFilteringSorting = () => {
            return (
               <div>
                    { this.state.showSettingsFields ? 
                    <FilteringAndSorting showComponent={this.state.items.length > 0} 
                                    dataType={Constants.HISTORY}
                                    items={this.state.items} 
                                    initialItems={this.state.initialItems}
                                    setFilteredItems = {items => this.setState({items: items})}/>
                    : null
                    }
            </div>
            );
        }

        let showClearButton = () => {
            return (
                <div>
                    { this.state.showSettingsFields ? 
                        <button onClick={(event) => {Utils.preventDefault(event); DataSource.clearHistory(this.state.items)}}>
                        {Constants.TITLES.CLEAR} </button>
                    : null
                    }
                </div>
            );
        }

        let showSettings = () => {
            return (
                <div className="footer">
                    <div className="full-width">
                        <div className="flex space-between">
                            {showClearButton()}
                            <Settings toggleSettings={(event) => this.toggleSettingsFields(event)}/>
                        </div>
                        <div className="flex space-between">
                            <div>
                                {showFilteringSorting()}
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
        return (
            <div>
               {this.state.items.map((item) => {
                    return (
                        <ProductItem key={item.key}
                                     product={item}
                                     color={item.value.color}
                                     addToShoppingList={(item) => DataSource.addToShoppingList(item)}/>
                    )

                })}
                {showSettings()}
            </div>
        );
    }
}

export default History;
