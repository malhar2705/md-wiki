import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';
import ArticleList from './ArticleList';
import Detail from './Detail';
import EditDetail from './EditDetail';
import AddDetail from './AddDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Router>
        <Routes>
          <Route exact path="/" element={<ArticleList />}  />
          <Route path="/:name" element={<Detail />}  />
          <Route path="/edit/:name" element={<EditDetail />}  />
          <Route path="/add" element={<AddDetail />}  />
          <Route path="/add/:name" element={<AddDetail />}  />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
