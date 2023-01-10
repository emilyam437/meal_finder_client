import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <div className="navBarCont" >
        <br/>
        <h4>Discover Foods:</h4>
        <Link to='/random-meal'><p className='navItem'>By Ingredients</p></Link>
        <Link to='/random-veg'><p className='navItem'>With Restrictions</p></Link>
        <Link to='/video'><p className='navItem'>Through Videos</p></Link>
    </div>
  )
}

export default Nav