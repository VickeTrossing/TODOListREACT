import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons' 

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
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.vale, 
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem !==""){
      const newItems=[...this.state.items, newItem];
      this.setState({
        this:newItems,
        currentItem :{
          text:"",
          key:""
        } 
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key!==key);
    this.setState({
      items:filteredItems
    })
  }


  render(){
    return(
     <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Enter text" value={this.state.currentItem.text} onChange={this.handleInput} />
            <button type="submit">Add</button>
          </form>
        </header>
    <ListItems items = {this.state.items} deleteItem={this.delteItem}/>
     </div>
    );
  }
}   

export default App;
