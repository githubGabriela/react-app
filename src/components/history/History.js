import React, { Component } from 'react';

import '../../assets/css/General.css';

class History extends Component {
    render() {
        return (
            <div className="container-with-padding">
                <div> History items </div>
                <button>Add to category </button>


                <div className="history">
                    <div classNamae="history-left">
                    <input type="checkbox"/>
                        left
                    </div>
                    <div>
                        center
                    </div>
                    <div classNamae="history-right">right
                    </div>
                </div>                
            </div>
        );
    }
}

export default History;
