import React, { Component } from 'react';

import * as DataSource from './data';
import { withSubscription } from './HOC';

class List extends Component {
    render() {
        return (
            <div>
               Comments: {this.props.data.length}
            </div>
        );
    }
}

const CommentList = withSubscription(
    List,
    (DataSource) => DataSource.getComments()
);

export default CommentList;