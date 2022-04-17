import React from 'react';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Content from '../Content/Content';

const Skeleton = () => {
  return (
    <div>

    <Navbar />
  {/* <h2>Some Content</h2> */}
    
    <Content />
    <Footer/>
    </div>
  )
}

export default Skeleton