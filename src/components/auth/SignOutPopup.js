import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import { hocPopupType } from '../popups/hoc/HocPopup';

class SignOut extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

const SignOutPopup = hocPopupType (
    SignOut,
    (type) => { return Constants.POPUP.CONFIRMATION; },
    (bodyText) => {
        return 'Confirm Sign out?';
    }
);

export default SignOutPopup;