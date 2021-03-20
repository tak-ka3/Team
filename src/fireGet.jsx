import React, {useState, useEffect} from 'react'
import {firestore} from './firebase'

const GetFire = () => {
  const mydata = []
  const [data, setData] = useState(mydata)
  const [message, setMessage] = useState("wait...")

  useEffect(() => {
    console.log('b')
    firestore
      .collection('mydata')
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
        const doc = document.data()
        console.log("c")
        mydata.push(
          <tr key = {document.id}>
            <td><a href = {'/fire/del?id =' + document.id}>
              {document.id}
            </a></td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        )
        })
        setData(mydata)
        setMessage('Firebase data')
      })

      firestore
      .collection('user')
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
        const doc = document.data()
        console.log(doc.contri)
        })
      })
  }, [])

  return <div>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossorigin="anonymous"></link>
    <div className = "alert alert-primary text-center">
      <h5 className = "mb-4">{message}</h5>
      <table className = "table bg-white text-left">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  </div>

}

export default GetFire;