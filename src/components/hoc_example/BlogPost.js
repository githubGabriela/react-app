import React, { Component } from 'react';

import * as DataSource from './data';
import { withSubscription } from './HOC';


class Post extends Component {
    render() {
        return (
            <div>BlogPost {this.props.data} </div>
        );
    }
}

const BlogPost = withSubscription(
    Post,
    (DataSource) => DataSource.getBlogPost('1')
);


export default BlogPost;
