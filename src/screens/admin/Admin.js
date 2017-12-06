import React, { Component } from 'react';
import './Admin.css';

//import {AdminTabs}  from './AdminRouter';
import AdminCategories from './AdminCategories';

class Admin extends Component {
    
    render() {
        return (
            <div className="Container">
                {/* <AdminTabs/> */}
                <AdminCategories/>
            </div>
        );
    }
}

export default Admin;
