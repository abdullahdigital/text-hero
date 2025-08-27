import Navbar from './components/Navbar.jsx';
import TextForm from './components/TextForm.jsx';
import About from './components/About.jsx';
import React, { useState, useEffect, useCallback } from 'react'
import CustomAlert from './components/CustomAlert.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from './components/Footer.jsx';


function App() {
const [mode,setMode]=useState('light'); //whether dark mode is enabled or not
const [alert,setAlert]= useState(null)

const showAlert = useCallback((message, type) => {
  setAlert({
    msg:message,
    type:type
  })
  setTimeout(() => {
    setAlert(null);
  }, 1500);
}, []);

useEffect(() => {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [mode, showAlert]);

const toggleMode = useCallback(() => {
  if(mode==='light'){
    setMode('dark')
    showAlert("Dark Mode has been enabled","success")
  }
  else{
    setMode('light')
    showAlert("Light Mode has been enabled","success")
  }
}, [mode, showAlert]);


  return (
   <div className={`${mode === 'dark' ? 'dark' : ''}`}>
   <BrowserRouter>
<Navbar title="NavbarReal" Home="House" mode={mode} toggleMode={toggleMode} />
<CustomAlert alert={alert}/>

<Routes>
	<Route  path="/About" element={<About mode={mode}/>}></Route>
	
	<Route  path="/" element={<TextForm  showAlert={showAlert} heading="Enter Text to Analze" mode={mode} />}></Route>
</Routes>


</BrowserRouter>
   <Footer />
   </div>
      
   
  );
}

export default App;
