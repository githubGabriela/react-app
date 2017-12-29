//import liraries
import React, { Component } from 'react';

import { hocSiblingsParent } from './HocSiblingsParent';

class Sibling extends Component {
    render() {
        return (
            <div style={{color: this.props.colorSibling1}}>Sibling1 
                <button onClick={()=> this.props.changeColor()}> Change color </button>
            </div>
        );
    }
}

const Sibling1 = hocSiblingsParent(Sibling);
export default Sibling1;