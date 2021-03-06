import React from 'react';
import './App.css';
import ListItems from './Components/ListItem/ListItems';
//import AddItem from './Components/AddItem/AddItem'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import PostQuotes from './Quotes/PostQuotes'


library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
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
  }


  componentDidMount() {
    fetch('./quotes')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }


  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value, 
        key: Date.now()
      }
    })
  }

  addItem(note){

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

      <div className="Quotes">
        <h2>Quote of the day:</h2>
        <PostQuotes/>
      </div>

     </div>
    );
  }
}   

export default App;
