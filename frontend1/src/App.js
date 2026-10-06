import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Enroll from './pages/Enroll';
import Fields from './pages/Fields';
import Features from './pages/Features';
import Student from './pages/Sudents';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/Enroll" 
              element={<Enroll/>} 
            />
             <Route 
              path="/Fields" 
              element={<Fields/>} 
            />
              <Route 
              path="/Features" 
              element={<Features/>} 
            />  
             <Route 
              path="/Students" 
              element={<Student/>} 
            />  
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

