import React,{Component} from 'react';
import Button from './components/Button'
import "./css/style.css"; 

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      current : '0',
      previous : [],
      nextIsReset: false,
      opflag: false
    }
  }  

  reset = () => this.setState({current :'0',previous:[]})
  
  addToCurrent=(symbol)=>{
    

    if(["+","-","/","*"].indexOf(symbol) != -1){
      let { previous, opflag} = this.state
      if(!opflag){
      previous.push(this.state.current , symbol);
      this.setState({previous, nextIsReset:true,opflag:true});
      //console.log((previous));
      }
      else{
        previous[previous.length-1]=symbol;
        this.setState({previous, nextIsReset:true});

      }
      
    } else {
      
      if((this.state.current === "0" && symbol != ".") || this.state.nextIsReset){
        this.setState({current:symbol, nextIsReset: false,opflag:false});
      } else {
      this.setState({current:this.state.current+symbol, opflag:false});
      }
    }

  }
  calculate = (symbol)=>{
    let {current,previous,nextIsReset}=this.state;
    if(previous.length>0){
      let str='';
      for(let nums of previous){
        str=str+nums;
      }
      console.log(str);
      current=eval(String(str+current));
      this.setState({current, previous:[], nextIsReset:true});

    }
  }
  render(){
    const buttons = [
      {symbol :'C' , cols:3, action: this.reset },
      {symbol :'/' , cols:1, action:this.addToCurrent },
      {symbol :'7' , cols:1, action:this.addToCurrent },
      {symbol :'8' , cols:1, action:this.addToCurrent },
      {symbol :'9' , cols:1, action:this.addToCurrent },
      {symbol :'*' , cols:1, action:this.addToCurrent },
      {symbol :'4' , cols:1, action:this.addToCurrent },
      {symbol :'5' , cols:1, action:this.addToCurrent },
      {symbol :'6' , cols:1, action:this.addToCurrent },
      {symbol :'-' , cols:1, action:this.addToCurrent },
      {symbol :'1' , cols:1, action:this.addToCurrent },
      {symbol :'2' , cols:1, action:this.addToCurrent },
      {symbol :'3' , cols:1, action:this.addToCurrent },
      {symbol :'+' , cols:1, action:this.addToCurrent },
      {symbol :'0' , cols:2, action:this.addToCurrent },
      {symbol :'.' , cols:1, action:this.addToCurrent },
      {symbol :'= ' , cols:1, action:this.calculate }
      ];
    return (
    <div className="App">
      {this.state.previous.length > 0 ?
      <div className="floaty-last">{ this.state.previous.map((str)=>{
        return str;
      })}
      </div> 
      : null }
      
      <input className="result" type="text" value={this.state.current}/>
      {buttons.map((btn,i)=>{
         return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=>{return btn.action(symbol)}}/>
      })}
    </div>
  ); 
  }
}

export default App;
