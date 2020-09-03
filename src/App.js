import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons' 
import { DB_CONFIG } from './Config/config.js'
import * as firebase from 'firebase';



library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);


    this.app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
    this.db = this.app.database().ref().child('notes');

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

  // componentDidMount(){
  //   const rootRef = firebase.database().ref().child('react');
  //   const todoRef = rootRef.child('speed');
  //   todoRef.on('value', snap =>{
  //     this.setState({
  //       text: snap.val(), 
  //       key: ""
  //     })
  //   });
  // }


//   add_task(){
//         let key = firebase.database().ref().child("unfinished_task").push().key;
//         let task = {
//             title: input_box.value,
//             date: input_date.value,
//             key: key
//         };

//         let updates = {};
//         updates["/unfinished_task/" + key] = task;
//         firebase.database().ref().update(updates);
//         create_unfinished_task();
    
// }





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
