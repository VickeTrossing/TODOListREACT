import React, {Component} from 'react';
import Quotes from './quotes.json'


class PostQuotes extends React.Component{

    render(){ 
        return(
            <div>
                {Quotes.map((postQuotes, index)=>{
                    return <h2>{postQuotes.quotes}</h2>
                })}
            </div>
        )
      }
    }   
    
    export default PostQuotes;
