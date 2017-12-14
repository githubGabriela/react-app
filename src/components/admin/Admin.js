import React, { Component } from 'react';
import './Admin.css';

import AdminTabs from './AdminRouter';

class Admin extends Component {
    
    render() {
        return (
           <AdminTabs />
        );
    }
}

export default Admin;
