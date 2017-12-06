import React, { Component } from 'react';
import * as firebase from 'firebase';

const config = {
        apiKey: "AIzaSyCcaraqh5VEYOO8zWh56fA276NXcwFXYbM",
        authDomain: "awesomeproject-88cb7.firebaseapp.com",
        databaseURL: "https://awesomeproject-88cb7.firebaseio.com",
        projectId: "awesomeproject-88cb7",
        storageBucket: "awesomeproject-88cb7.appspot.com",
        messagingSenderId: "663794427834"
};

firebase.initializeApp(config);


class HandleDataHIHIHI extends Component {
    constructor(){
        super();
        this.state = {
            data : {}
       };
    }

    handleDataFromDb(){
        const dbRef= firebase.database().ref().child('data');
        dbRef.on('value', snap => {
            const mappedData = {};
            snap.forEach( childSnap => {
                mappedData[childSnap.key] = childSnap.val();
            });
            this.setState({
                data : mappedData
            });
        });
    }

    componentDidMount() {
        this.handleDataFromDb();
    }

    getCategories(){
        console.log( Object.keys(this.state.data));
        return Object.keys(this.state.data);
    }

    getProductsByCategory(category){
        console.log(this.state.data[category]);
        return this.state.data[category];
    }


    render () {
            return (
            <div>
                <div>Handle data {this.state.testData}</div>
                <button onClick={() => this.getCategories()}> get cat </button>
                <button onClick={() => this.getProductsByCategory('legumes')}> get legumes </button>
                <div>Input: {this.props.inputProperty}</div>
            </div>
        );
    }
}

export default HandleData;
