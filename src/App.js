import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Random from './pages/RandomRecipe';
import ErrorPage from './pages/ErrorPage';
import RandomVeg from './pages/RandomVeg';
import RecipeVideo from './pages/RecipeVideo';
import Nav from './pages/Nav';

function App() {

  return (
<div className="App">
<Router>
<Nav />
        <Routes>
          <Route path='/random-meal' element={<Random />} />
          <Route path='/random-veg' element={<RandomVeg />} />
          <Route path='/video' element={<RecipeVideo />} /> 
          <Route path='/' element={<Random />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>

</div>
  );
}

export default App;
