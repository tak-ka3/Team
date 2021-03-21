import './App.css';
import React, {useEffect, useState} from 'react'
import fetch from 'node-fetch';
import axios from 'axios'

const PostApi = () => {

  const [account, setAccount] = useState("")
  const [lang, setLang] = useState("frontend")
  const [contri, setContri] = useState(50)
  const [button, setButton] = useState(true)
  // const [data, setData] = useState({})

  const doLang = (e) => {
    setLang(e.target.value)
  }

  const doChange = (e) => {
    setAccount(e.target.value)
  }
  const input = () => {
    fetch(`http://160.251.78.132/users/${account}/contributions`)
      .then( res => res.json() )
      .then( res => {
        setContri(Number(res.contributions))
      })
  }
  
  useEffect(() => {
    console.log("useEffect:", contri)
    // POST送信
    if (account.length != 0){
      fetch("http://160.251.78.132/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          account_name: account,
          role: lang,
          contribution: contri
        })
      }).then(function(response) {
        // レスポンス結果
        console.log(response)
      }, function(error) {
        // エラー内容
        console.error(error.message)
      });
    }
  }, [contri])

  return (
    <div className="App">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossorigin="anonymous"></link>
      <h1>Hello!</h1>
      {contri}
        <h3>Github Account</h3>
        <p>Input</p>
        <input className="display-3" type="text" onChange={doChange}/>
        <div className = "languages">
        <select onChange = {doLang}>
          <option value = "frontend">フロントエンド</option>
          <option value = "backend">バックエンド</option>
          <option value = "any">どちらでも</option>
        </select>
        </div>
        <input type="button" className="btn btn-primary" value="Submit" onClick={()=>input()}/>
    </div>
  );
}

export default PostApi;