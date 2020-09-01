import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons' 
import * as firebase from 'firebase';

// var config = {
//   apiKey: "AIzaSyDIW_W_0jdaffMD2yRdcljQo4WNkg3yZoU",
//   authDomain: "todoreact-c486d.firebaseapp.com",
//   databaseURL: "https://todoreact-c486d.firebaseio.com",
//   projectId: "todoreact-c486d",
//   storageBucket: "todoreact-c486d.appspot.com",
//   messagingSenderId: "650739750861",
//   appId: "1:650739750861:web:3767616263503f9f5a1684",
//   measurementId: "G-0HRENKS3PY"
// };


// firebase.initializeApp(config);

library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:"",
        key:""
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value, 
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items=[...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem :{
          text:"",
          key:""
        } 
      })
    }
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }

  setUpdate(text, key){
    const items = this.state.items;
    items.map(item =>{
      if(item.key===key){
        console.log("Cyka Blyat");
        item.text=text;
      }
    })
    this.setState({
      items: items
    })
  }

  render(){
    return(
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Enter TODO" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
            <button type="submit">Add</button>
          </form>
          <p>{this.state.items.text}</p>

          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
          
        </header>
     </div>
    );
  }
}   

export default App;
