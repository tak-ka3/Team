import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import fetch from 'node-fetch';
import jsdom from 'jsdom';

function App() {

  const url = 'https://github.com/users/tak-ka3/contributions'


  const [account_array, setAccount_array] = useState([''])
  const [input, setInput]  = useState(['data.0'])
  const [array, setArray] = useState([])

  const doChange = (e) => {
    let data = array
    data[Number(e.target.value)] = e.target.value
    setAccount_array(data)
    console.log(data)
  }

  const onAddAccount = (e) => {
    // data.push(accountName)
    // setAccount_array(data)
    // console.log(data)
    // console.log(account_array)
    console.log(account_array)
    e.preventDefault()
  }

  function addInput() {
    const newInput = [...input];
    newInput.push(`data.${(input.length)}`);
    setInput(newInput);
    let data = array
    data.push("")
    setAccount_array(data)
    console.log(data)
  };

  useEffect(() => {

    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

    let languages_url
    // let data = []
    console.log("a")

    fetch("https://api.github.com/users/tak-ka3/repos")
    .then(response => response.json())
    .then(data => {
      data.map((val) => {
        languages_url = val.languages_url
        fetch(languages_url)
        .then(res => res.json())
        .then(data => {
        })
      })
    })


  //   const { JSDOM } = jsdom;
  // const request = require('request');

  // const userName = "tak-ka3";

  // var options = {
  //   url: `https://github.com/users/${userName}/contributions`
  // }

  // request(options, function (error, response, body) {
  //   body = body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); // タグを除去
  //   body = body.replace(/ |,|\r?\n/g, '');                  // 不要な文字を除去
  //   body = body.match(/^[0-9]*/);
  //   console.log(body[0]);
  //   console.log(body)
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
        <input type = "submit" className = "btn" value = "Click"/>
      </form>
    </div>
  );
}

export default App;
