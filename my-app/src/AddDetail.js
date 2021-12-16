import React from 'react';
import { useParams } from "react-router-dom";

import './ArticleList.css';

const AddDetail = () => {
  const { name } = useParams();
    return (
      <div>
        <h1>Add Article: {name}</h1>
        <form>
          <div className="field-class"><label>Name:</label><input className="text-field" type="text" value={name} /></div>
          <div className="field-class"><label>Description:</label><input className="text-field" type="text" /></div>
          <div className="field-class"><input type="button" className="button green" value="Submit"></input> <input className="button red" type="button" value="Cancel"></input></div>
        </form>
      </div>
    );
}

export default AddDetail;
