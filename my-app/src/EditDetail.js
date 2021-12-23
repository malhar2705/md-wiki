import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
//import ArticlesJSON from './articles.json';
import axios from 'axios';
import './ArticleList.css';



const EditDetail = (onChangeForm, editDetailArticle) => {
  
  //const [name, setArticleName] = useState('');
  const [desc, setArticleDesc] = useState('');
  const { name } = useParams();
  function editDetailArticle(data){
    console.log(data);
  }

  const updateAPIData = () => {
    axios.put(`/articles/${name}`, {
      "name":name,  
      "desc":desc
    }).then((response)=>{
      console.log(response);
      window.location.href = '/';
    }).catch((error)=>{
      console.log("Description should be 10 chars long");
    });
  }

  const [ArticlesJSON, setAPIData] = useState([]);
  useEffect(() => {
      axios.get(`/articles`)
          .then((response) => {
              console.log(response.data)
              setAPIData(response.data);
          })
  }, []);

  let selectedData = ArticlesJSON.find(item=>item.name===name);
  if(selectedData){
    return (
      <div>
        <h1>Edit Article: {selectedData.name}</h1>
        <form>
          <div className="field-class"><label>Name:</label><input name="articleName" id="articleName" className="text-field" type="text" value={selectedData.name} /></div>
          <div className="field-class"><label>Description:</label><input onChange={(e) => setArticleDesc(e.target.value)} name="articleDesc" id="articleDesc" className="text-field" type="text" defaultValue={selectedData.desc} /></div>
          <div className="field-class"><input type="button" className="button green" onClick={updateAPIData} value="Submit"></input> <input onClick={event =>  window.location.href='/'} className="button red" type="button" value="Cancel"></input></div>
        </form>
      </div>
    );
  }
  else{
    return(
      <h3>No article found.</h3>
    );
  }
}

export default EditDetail;
