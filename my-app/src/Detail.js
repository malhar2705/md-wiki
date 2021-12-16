import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import './ArticleList.css';

const Detail = () => {

  const [ArticlesJSON, setAPIData] = useState([]);
  useEffect(() => {
      let isApiSubscribed = true;
      axios.get(`/articles`)
        .then((response) => {
          console.log(response.data);
          if(isApiSubscribed){
            setAPIData(response.data);
          }
        });
        return ()=>{
          isApiSubscribed = false;
        };
  }, []);

  const { name } = useParams();
  let selectedData = ArticlesJSON.find(item=>item.name===name);
  if(selectedData){
    return (
      <div>
        
        <div className="field-class"><h1>Article: {selectedData.name}</h1><a className="button green" href={'/edit/'+selectedData.name}>Edit</a></div>
        <div className="field-class"><label>Name:</label><span className="text-field">{selectedData.name}</span></div>
        <div className="field-class"><label>Description:</label><span className="text-field">{selectedData.desc}</span></div>
      </div>
    );
  }
  else{
    return(
      <div className="field-class"><h1>Article <u>{name}</u> not found.</h1><a className="button green" href={'/add/'+name}>Add</a></div>
    );
  }
};

export default Detail;
