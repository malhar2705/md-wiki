import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
//import ArticlesJSON from './articles.json';
import axios from 'axios';
import './ArticleList.css';



const EditDetail = (onChangeForm, editDetailArticle) => {
  async function editDetailArticle(data){
    console.log(data);
  }
  const [ArticlesJSON, setAPIData] = useState([]);
  useEffect(() => {
      axios.get(`/articles`)
          .then((response) => {
              console.log(response.data)
              setAPIData(response.data);
          })
  }, []);
  const { name } = useParams();
  let selectedData = ArticlesJSON.find(item=>item.name===name);
  if(selectedData){
    return (
      <div>
        <h1>Edit Article: {selectedData.name}</h1>
        <form>
          <div className="field-class"><label>Name:</label><input name="articleName" id="articleName" onChange={(e)=>onChangeForm(e)} className="text-field" type="text" value={selectedData.name} /></div>
          <div className="field-class"><label>Description:</label><input name="articleDesc" id="articleDesc" onChange={(e)=>onChangeForm(e)} className="text-field" type="text" value={selectedData.desc} /></div>
          <div className="field-class"><input onClick={(e)=>editDetailArticle()} type="button" className="button green" value="Submit"></input> <input className="button red" type="button" value="Cancel"></input></div>
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
