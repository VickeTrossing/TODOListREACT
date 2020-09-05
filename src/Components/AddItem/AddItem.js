import React from 'react';


class AddItem extends React.Component{

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
}

export default AddItem;