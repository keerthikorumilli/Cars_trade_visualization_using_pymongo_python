import React from 'react';
import Header from '../components/Header/Header';
import PlotComponent from '../components/Plot/Plot';
import Footer from '../components/Footer/Footer';
function Home_Page() {
  return (
    <div className="App">
      <Header/>
      <PlotComponent/> 
       <Footer/>   
       </div>
  );
}

export default Home_Page;