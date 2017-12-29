//import liraries
import React, { Component } from 'react';

import { hocSiblingsParent } from './HocSiblingsParent';

class Sibling extends Component {
    render() {
        return (
            <div style={{color: this.props.colorSibling2}}>Sibling2 
                <button onClick={()=> this.props.changeColor()}> Change color </button>
            </div>
        );
    }
}


const Sibling2 = hocSiblingsParent(Sibling);
export default Sibling2;