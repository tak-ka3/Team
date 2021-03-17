import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import axios from 'axios'

function App() {

  const url = 'https://github.com/users/tak-ka3/contributions'


  const [account_array, setAccount_array] = useState([''])
  const [input, setInput]  = useState(['data.0'])
  // const [array, setArray] = useState([])

  const doChange = (e) => {
    let data = account_array
    data[Number(e.target.name)] = e.target.value
    setAccount_array(data)
  }

  function addInput() {
    const newInput = [...input];
    newInput.push(`data.${(input.length)}`);
    setInput(newInput);
    let data = account_array
    data.push("")
    setAccount_array(data)
  };

  const onAddAccount = (e) => {
    console.log(account_array)
    e.preventDefault()
    let languages_url
    account_array.map((name) => {
      fetch(`https://api.github.com/users/${name}/repos`)
      .then(response => response.json())
      .then(d => {
        d.map((val) => {
          languages_url = val.languages_url
          fetch(languages_url)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            return data
          })
          return val;
        })
      })
    })
  }

  useEffect(() => {

    // contributionの取得が上手くいかない
    axios.get(url)
      .then((res) => {
        console.log(res.data)
      })

    
    // let data = []
    console.log("a")

    // fetch("https://api.github.com/users/tak-ka3/repos")
    // .then(response => response.json())
    // .then(data => {
    //   data.map((val) => {
    //     languages_url = val.languages_url
    //     fetch(languages_url)
    //     .then(res => res.json())
    //     .then(data => {
    //     })
    //   })
    // })
  }, [])

  return (
    <div className="App">
      <h1>Hello!</h1>
      <form onSubmit = {onAddAccount}>
      <h3>Github Account</h3>
      <p>Input</p>
        {input.map((val, index) => {
          return <div key = {val}>
            <input className = "display-4" type = "text" name = {index} onChange = {doChange}/>
          </div>
        })}
        <input type = 'button' className = "btn" onClick = {addInput} value = "plus"/>
        <input type = "submit" className = "btn" value = "Submit"/>
      </form>
    </div>
  );
}

export default App;
