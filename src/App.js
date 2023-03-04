import './App.css';
import React, { useState, useEffect } from "react";
import ContentApp from './comp/ContentApp';
import { Button } from 'react-bootstrap';
// import multer from 'multer';
// import path from 'path';
import axios from 'axios';
//require("dotenv/config");

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '../uploads/', 'images'),
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

function App() {
  let [dataContents, setDataContents] = useState([]);

  //const urlApi = 'http://localhost:4000/products';
  const urlApi = 'https://api-o9ek.onrender.com/products';

  const fetchApi = async () => {
    setDataContents([])
    const res = await fetch(urlApi);
    res.json()
      .then(res => setDataContents(res))
      .catch((err) => { console.log("ERR : " + err) });
  };

  useEffect(() => {
    // let testData = [
    //   {
    //     "name": "bbbbbbbbbb",
    //     "url": "./uploads/images/img-20022023-21_34.png",
    //     "price": 1000

    //   }
    // ]
    // setDataContents(testData)

    fetchApi();


  }, [])

  let dataElements = null
  dataElements = dataContents.map((dataContent, index) => {
    return (<ContentApp key={index}
      dataContent={dataContent}
      urlApi={urlApi}
    />);
  })

  const [productName, setProductName] = useState()
  const [productPrice, setProductPrice] = useState()
  const [userInfo, setUserInfo] = useState({
    file: [],
  })
  const handleName = (e) => {
    setProductName(e.target.value)
  }
  const handlePrice = (e) => {
    setProductPrice(e.target.value)
  }
  const handleImage = (e) => {
    console.log(e.target.files);
    setUserInfo({
      ...userInfo,
      file: e.target.files[0]
    })
  }

  const handleApi = async () => {
    //alert(productName + productPrice)
    const formData = new FormData();
    formData.append('image', userInfo.file);
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    console.log(userInfo.file.name)
    if (!!productName && !!productPrice) {

      //alert("yes")
      axios.post(urlApi, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(res => {
          console.log(res);
        })
        window.location.reload(false);
    } else {
      alert("please enter data")
    }
    
  }
  return (
    <div className="App">
      <div className="new-product">

        <input type="file" className="form-control" name='images' onChange={handleImage} accept="image/png, image/jpeg" />
        <input type="text" placeholder='Name' value={productName} onChange={handleName} />
        <input type="number" placeholder='Price' value={productPrice} onChange={handlePrice} />
        <Button className='btn-primary' onClick={ handleApi}>Add</Button>
      </div>
      <div className="show-img">
        {dataElements}
      </div>
    </div>
  );
}

export default App;
