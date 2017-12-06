import React, { Component } from 'react';

class AdminCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
          category: 'iniatial category'
        }
      }

      addCategory(){
            console.log('bututon clicked'+ this.state.category);
            // add the category to firebase
      }

    render() {

        return (
            <div className="Container">
                <div>Admin categories</div>

            <input type="text"
                placeholder="category"
                value={this.state.category}
                onChangeText={(category) => this.setState({category: category})}
                />

                 {/* <FontAwesome name='users'/> */}

                <div>added category: {this.state.category}</div>

                    <button className="ButtonContainer"
                            onPress={this.addCategory.bind(this)}
                            title="Add"
                            color="#841584"
                            accessibilityLabel="Add a new category">
                    </button>
        </div>
        );
    }
}


export default AdminCategories;
