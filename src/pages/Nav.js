import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {

  return (
    <div className="navBarCont" >
        <br/>
        <h4 className="mobileNav">Discover Foods:</h4>
        <Link to='/random-meal'><p className='navItem mobileNav'>By Ingredients</p></Link>
        {/* <Link to='/random-veg'><p className='navItem mobileNav'>With Restrictions</p></Link> */}
        <Link to='/video'><p className='navItem mobileNav'>Through Videos</p></Link>
    </div>
  )
}

export default Nav