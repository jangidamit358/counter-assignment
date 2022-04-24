import React,{useState,useEffect} from "react";
import "./style.css";
import { TailSpin } from  'react-loader-spinner'
import axios from 'axios'
export default function App() {
  let MAX_VALUE=1000;
  const [num,setNum]=useState(1)
 const [loading,setLoading]=useState(false)

 useEffect(()=>{
   setLoading(true)
axios.get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/amit2.json')
.then((data)=>{
  console.log(data.data)
  if(data.data==null)
  {
  axios.put("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",{
    amit2:1
  })
  .then(function (response) {
    console.log("put",response.data.amit2);
    
  })
  
  }else{
    console.log('get',data.data)
    setNum(data.data)
  }
  setLoading(false)
})
 },[])

  const handleInput=(e)=>{
    if(e.target.value<=1000 )
    {
      setNum(+e.target.value)
      setLoading(true)
      console.log(num)
      axios.put("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",{
        amit2:+e.target.value
      })
      .then(function (response) {
        console.log("put",response.data.amit2);
        setLoading(false)
      })
    }
    else 
    {
      alert('invalid input')
    }
  }
  const handleButton=(value)=>{
    if(num==='')
    {
      setLoading(true)
      setNum(1)
      console.log(num)
      axios.put("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",{
        amit2:1
      })
      .then(function (response) {
        console.log("put",response.data.amit2);
        setLoading(false)
      })
    }else{

      setLoading(true)
      setNum(num+value)
      console.log(num)
      axios.put("https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",{
        amit2:num+value
      })
      .then(function (response) {
        console.log("put",response.data.amit2);
        setLoading(false)
      })

    }
  
  }
  return (
    <div id="container">
      <div id="loader">
   {(loading==true)?(
     <>
   <TailSpin 
    height="16"
    width="16"
    color='black'
    ariaLabel='loading'
  />
  <p id="loaderText">Saving counter value</p>
  </> ):<p style={{margin:'8px'}}></p>}</div>
    <div id="mainBox" >
      
      <div className="Box" id="Box1" onClick={()=>handleButton(-1)}>-</div>
    <input type="number" className="Box" value={num} onChange={handleInput} style={{height:"58px"}} />
    
      <div className="Box" id="Box3" onClick={()=>handleButton(1)}>+</div>
    </div>

    <div ><p id="showResult">Counter value : {num}</p></div>
    </div>
  );
}
// { (edit==true)?(<div className="Box" className="Box2" onClick={
//    setEdit(true)
//  } onInput={console.log('ge')}>{0}</div>):(<input type="number" className="Box Box2" value={num} onChange={handleInput} style={{height:"54px"}} />)}