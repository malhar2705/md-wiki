import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './ArticleList.css';

function ArticleList() {
  function clickRead(Art) {
    console.log(Art.id);
  }
  const [APIData, setAPIData] = useState([]);
    useEffect(() => {
      let isApiSubscribed = true;
        axios.get(`/articles`)
            .then((response) => {
              if(isApiSubscribed){
                setAPIData(response.data);
              }
            });
            return ()=>{
              isApiSubscribed = false;
            };
    }, []);
  return (
    <div>
      <h1>Articles</h1>
      <ul className="article-list">
        {
          APIData.map((article) => {
            return(
              <li key={article.id}><a onClick={()=>clickRead(article)} href={"/"+article.name}>{article.name}</a></li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default ArticleList;
