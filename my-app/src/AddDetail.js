import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './ArticleList.css';

const AddDetail = (onChangeForm, addDetailArticle) => {
  const [articleName, setArticleName] = useState('');
  const [articleDesc, setArticleDesc] = useState('');
  const { name } = useParams();
  function addDetailArticle(data){
    console.log(data);
  }
  const addAPIData = () => {
    axios.post(`/articles`, {
      "name":articleName?articleName:name,  
      "desc":articleDesc
    }).then((response)=>{
      console.log(response);
      window.location.href = '/';
    }).catch((error)=>{
      console.log("Name should be 3 chars long and Description should be 10 chars long");
    });
  }
  
    return (
      <div>
        <h1>Add Article: {name}</h1>
        <form>
          <div className="field-class"><label>Name:</label><input onChange={(e) => setArticleName(e.target.value)} className="text-field" type="text" defaultValue={name} /></div>
          <div className="field-class"><label>Description:</label><input onChange={(e) => setArticleDesc(e.target.value)} className="text-field" type="text" defaultValue="" /></div>
          <div className="field-class"><input onClick={addAPIData} type="button" className="button green" value="Submit"></input> <input onClick={event =>  window.location.href='/'} className="button red" type="button" value="Cancel"></input></div>
        </form>
      </div>
    );
}

export default AddDetail;
