import React, { Component } from 'react';
import './Admin.css';



//import {AdminTabs}  from './AdminRouter';
import Categories from '../categories/Categories';

class Admin extends Component {
    
    render() {
        return (
            <div className="Container">
                {/* <AdminTabs/> */}
                <Categories/>
            </div>
        );
    }
}

export default Admin;
