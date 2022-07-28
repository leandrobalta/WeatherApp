import {FiSearch } from "react-icons/fi"
import "./style.css"
import React, { useState } from "react"
import api from "./apiservices/weatherApi"

function App() {

  const [input, setInput] = useState('');
  const [infoinput, setinfoinput] = useState();

  async function Search(){

    if (input === ''){
      alert("Enter some location please... :/")
      console.log("The input location is null")
      return;
    }

    try{
      const response = await api.get(`${input}`);
      console.log("[Response Log] ->", response)
      setinfoinput(response.data)
      setInput('')
    }
    catch{
      alert("Error with searching...")
      console.log("Error requesting the API")
      setInput('')
    }
  } 
     
  return (
    <div className="App">
      <h1 className="title">Weather Guru</h1>
      <div className="AppInput">
        <input
        type = "text"
        placeholder = "Enter your City..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button onClick={Search}>
         <FiSearch size={20} color="#000"/>
        </button>
      </div>
      {
        infoinput ?  
        <main className="main">
        <h1>City: {infoinput.location.name} - {infoinput.location.country}</h1>
        <span>Description:  {infoinput.current.condition.text}</span>
        <span>Temperature: {infoinput.current.temp_c}°F</span>
        <span>Thermal feeling: {infoinput.current.feelslike_c}°F</span>
        <span>Humidity: {infoinput.current.humidity}%</span>
        </main> : <React.Fragment/>
      }
    </div>
  );

}
export default App;