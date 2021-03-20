import './App.css';
import React, {useEffect, useState} from 'react'
import fetch from 'node-fetch';
import jsdom from 'jsdom';
import axios from 'axios'
import GetFire from './fireGet'

const PostApi = () => {

  const [account, setAccount] = useState('')
  const [lang, setLang] = useState('frontend')

  const doChange = (e) => {
    setAccount(e.target.value)
  }

  const doLang = (e) => {
    setLang(e.target.value)
  }

  const getApi = (e) => {
    axios.get(`http://160.251.78.132/users`)
    .then(res => {
      const items = res.data
      console.log(items)
    })
  }

  const onAddAccount = (e) => {
    console.log(lang)
    e.preventDefault()
    let languages_url
    fetch(`https://api.github.com/users/${account}/repos`)
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
    // POST送信

    axios.post('http://160.251.78.132/users', {
      account_name: account,
      role: lang,
      contribution: 30
  },{
    
  }
  );

    // fetch('http://160.251.78.132/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': "application/json",
    //     // 'Accept': "application/json"
    //     // 'Access-Control-Allow-Origin': '*',
    //     // 'Content-Length': 100,
    //     // 'Authorization': 
    //   },
    //   body: JSON.stringify({
    //     account_name: account,
    //     role: lang,
    //     contribution: 30
    //   })
    // }).then(function(response) {
    //   // レスポンス結果
    //   console.log('ok')
    // }, function(error) {
    //   // エラー内容
    // });

  }

  useEffect(() => {
    const url = `https://github.com/users/hironomiu/contributions`

    // contributionの取得が上手くいかない
    // axios.get(url)
    //   .then((res) => {
    //     let data = res.data
    //     console.log('b')
    //   })
    // console.log("a")
    // const { JSDOM } = jsdom;
    // (async () => {
    //   const res = await fetch(url);
    //   const html = await res.text();
    //   const dom = new JSDOM(html);
    //   const document = dom.window.document;
      // const nodes = document.querySelectorAll('#infotablefont tr:nth-child(4) td');
      // const tokyoWeathers = Array.from(nodes).map(td => td.textContent.trim());
      // console.log(tokyoWeathers);
  // })();

  // const request = require('request');
  // var options = {
  //   url: url
  // }
  // request(options, function (error, response, body) {
  //   body = body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); // タグを除去
  //   body = body.replace(/ |,|\r?\n/g, '');                  // 不要な文字を除去
  //   body = body.match(/^[0-9]*/);
  //   console.log(body[0]);
  // })
  
  }, [])

  return (
    <div className="App">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossorigin="anonymous"></link>
      <h1>Hello!</h1>
      <form onSubmit = {onAddAccount}>
        <h3>Github Account</h3>
        <p>Input</p>
        <input className = "display-3" type = "text" onChange = {doChange}/>
        <div className = 'languages'>
        <select onChange = {doLang}>
          <option value = 'frontend'>フロントエンド</option>
          <option value = 'backend'>バックエンド</option>
        </select>
        </div>
        <input type = "submit" className = "btn btn-primary" value = "Submit"/>
      </form>
      <button onClick = {getApi}>GetAPI</button>
    </div>
  );
}

export default PostApi;