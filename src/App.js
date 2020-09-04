import React from 'react';
import './App.css';
import ListItems from './Components/ListItem/ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { DB_CONFIG } from './Config/config.js';
import * as firebase from 'firebase/app';
import 'firebase/database';




library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);

    this.addNote = this.addNote.bind(this);

    this.app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
    this.database = this.app.database().ref().child('notes');

  //   database.on('value', snapshot =>{
  //     this.setState({
  //       data: snapshot.val()
  //     })
  //  });
 

    this.state={
      test: "test",
      notes: [],
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
    this.addNote = this.addNote.bind(this);
  }


  componentDidMount(){
    const dbRef = firebase.database().ref().child('notes');
    const testRef = dbRef.child('test');
    testRef.on('value', snap => {
      this.setState({
        test: snap.val()
      })
    })
  }

  


  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value, 
        key: Date.now()
      }
    })
  }


  addNote(note){
    this.database.push().set({ noteContent: note});
  }

  addItem(note){

    //this.database.push().set({noteContent: note});




    note.preventDefault();
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
        <div className="App-header" id="top">
          <form id="to-do-form" onSubmit={this.addItem}>
              <input type="text" placeholder="Enter TODO" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
              <button type="submit">Add</button>
          </form>
          <p>{this.state.items.text}</p>
        </div>

        <div className="App-body" id="below">
          <header>
            
          
            
            

            <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
      
          
            
          </header>
       </div>
     </div>
    );
  }
}   

export default App;
