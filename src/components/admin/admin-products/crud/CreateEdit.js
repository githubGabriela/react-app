import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../../../utils/Constants';
import CreateEditProductPopup from '../../../popups/CreateEditProductPopup';

class CreateEdit extends Component {
    constructor() {
        super();
        this.state = {
            productPopupOpened: false
        }
        this.openProductPopup = this.openProductPopup.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    openProductPopup(event){
        event.preventDefault();
        this.setState({
            productPopupOpened: true
        });
    }

    closeProductPopup(event){
        this.setState({
            productPopupOpened: false
        });
    }

    render() {
        let showEdit = () => {
            return (
                <div>
                    {this.props.type === Constants.UTILS.EDIT && this.props.showSettingsFields ? 
                        <FontAwesome name="pencil" onClick={(event) => this.openProductPopup(event)}/>
                        : null
                    }
                </div>
            );
        }

        let showCreate = () => {
            return (
                <div>
                    {this.props.type === Constants.UTILS.CREATE ? 
                        <button onClick={(event) => this.openProductPopup(event)}>{this.props.popupTitle}</button>
                        : 
                        null
                    }
                </div>
            );
        }


        return (
            <div>
                {showCreate()}
                {showEdit()}
                <CreateEditProductPopup type={this.props.type}
                                        isOpened={this.state.productPopupOpened}
                                        item={this.props.item}
                                        closePopup={(event) => this.closeProductPopup(event)}/>
            </div>
            );
    }
}

CreateEdit.propTypes = {
    type: PropTypes.string,
    popupTitle: PropTypes.string,
    item: PropTypes.object
}

export default CreateEdit;
