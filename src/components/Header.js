import { fontFamily } from '@mui/system';
import React from 'react';
const HeaderStyle = {
  color: 'white',
  fontFamily: 'verdana',
   padding:'2vh',
   marginLeft:'15%',
   fontSize: '50px',
}
const Header = () => {
  return <div>
       <h1 style={HeaderStyle}>Welcome to Spacetagram!</h1>
  </div>;
};

export default Header;
