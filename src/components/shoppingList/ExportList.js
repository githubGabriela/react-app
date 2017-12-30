import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import CopyToClipboard from 'react-copy-to-clipboard';

class ExportList extends Component {
    constructor(){
        super();
        this.state = {
            list: '',
            copiedToClipboard : false
        }

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard(event){
        event.preventDefault();
        let list = this.createMapCategoriesProducts();
        let formatedList = this.formatList(list);
        this.setState({
            list: formatedList
        });
    }

    formatList(list) {
        let formatedList = '';
        let keys = Object.keys(list);
        keys.forEach( key => {
            if(list[key].length > 0) {
                formatedList += this.capitalizeValue(key) + list[key].join(', ') + '\n';
            }
        });
        return formatedList;
    }

    capitalizeValue(value) {
        if(value === 'No category') { 
            return ''; 
        }
        return value.charAt(0).toUpperCase() + value.slice(1) + ': ';
    }

    createMapCategoriesProducts(){
        let list = {
            'No category' : []
        };
        this.props.categories.forEach(name => {
            list[name] = [];
        });

        this.props.products.forEach(item => {
            list[item.value.category].push(item.value.name);
        });
        return list;
    }

    render() {
        return (
                <div>
                    <CopyToClipboard text={this.state.list}
                                     onCopy={() => this.setState({copiedToClipboard: true})}>
                         <FontAwesome name="share-square-o" onClick={(event) => this.copyToClipboard(event)}/>
                    </CopyToClipboard>
                    {this.state.copiedToClipboard ? <span style={{color: 'red'}}>Copied.</span> : null}

                </div>
            );
    }
}

export default ExportList;
