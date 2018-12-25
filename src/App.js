import React, { Component } from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
   super(props);
   this.state={
      display : "0",
      clickedNumber : false,
      beginWtithDecimal: false,
      zeroAlreadyPressed: true,
      clickedOperator: false,
      onDecimal: false,
      
     
    }
   this.resetDisplay = this.resetDisplay.bind(this); 
   this.doWriteNumber = this.doWriteNumber.bind(this);
   this.doOperation = this.doOperation.bind(this); 
   this.doEquals = this.doEquals.bind(this);
  this.doWriteDecimal =this.doWriteDecimal.bind(this);
  }
 
  doWriteNumber(btn){
  if(!this.state.clickedNumber && 
      btn.target.innerText !== "0"){
   this.setState({
      display: btn.target.innerText,
      clickedNumber: true,
      clickedOperator: false,
      onDecimal: false,
     
   })
   }else if(this.state.clickedNumber){
     this.setState({
       display : this.state.display + btn.target.innerText,
       clickedOperator: false,
      })
   }
   
  }
 resetDisplay(){
    this.setState({
      display: 0,
      clickedNumber: false,
      clickedOperator: false,
      accumul: "",
      onDecimal: false
    })
  }
 doOperation(operator){
   if(!this.state.clickedOperator){
    this.setState({
      display: this.state.display + operator.target.innerText,
      clickedOperator: true,
      onDecimal: false
      
      
    })
   }else{
      let arr = this.state.display.split("");
   arr.splice(arr.length-1,1,operator.target.innerText);
      this.setState({
        display: arr.join("")
      })
   
    }
  
 }
 doEquals(eq){
  
  let arr = eval(this.state.display) 
    
   
  this.setState({
    display: arr.toString()
  })
  
  //const arr = this.state.display.split(/[\+\-\*\/]/)
  
  
}
doWriteDecimal(btn){
  if(!this.state.onDecimal){
    this.setState({
      display: this.state.display + btn.target.innerText,
      onDecimal: true,
      clickedNumber: true,  
    })
  }
}

 
  render(){
    const arrBtns = [
      "zero","one",
      "two", "three",
      "four", "five",
      "six", "seven",
      "eight", "nine"
    ];
    const operators = [
      {
        "id" : "add", 
        "content" : "+"
      },
      {
        "id" :"subtract",
        "content" : "-"
      },
      {
        "id" : "multiply",
        "content" : "*"
      },
      {
        "id" : "divide",
        "content" : "/"
      }
      
    ]
    return(
      <div id="app">
      <Display
        content = {this.state.display}
       />
      
        {
          arrBtns.map((number, index)=>(
             <Button 
               className="operators"
               key={index}
               name={index}
               id={number}
               onClick={this.doWriteNumber}
               />
            
            )
          )
        }
     
        <Button 
          id="decimal"
          name="."
          onClick={this.doWriteDecimal}/>
       
          {
            operators.map((btn, index)=>{
              return(
              <Button key={`operator_${index}`}
                name={btn.content}
                id={btn.id}
                onClick={this.doOperation}/>
              )
                })
          }
       
        <Button
          id="clear"
          name="CE"
          onClick={this.resetDisplay}/>
        <Button 
         id="equals"
         name={"="}
          onClick={this.doEquals}/>
    </div> 
   )
  }
}
const Button = (props)=>(
  <button 
    id={props.id}
    onClick={props.onClick}>
    {props.name}
  </button>
);
const Display = (props)=>(
   <div id="display">
    {props.content}
    
  </div> 
);



export default App;
