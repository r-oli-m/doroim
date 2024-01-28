// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Navbar';

const App = () => {
 return (
    <div>
      <Navbar />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
       </Routes>
    </div>
 );
};

export default App;