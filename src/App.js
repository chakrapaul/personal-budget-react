import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Menu from './Menu/Menu';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './Login/LoginPage';

function App() {
  return (
    <Router>
      <Menu /> 
      <Hero />  
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;



// export default App;
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Simple components to check routing and content rendering
// function HomePage() {
//   console.log("HomePage component is being rendered");
//   return <h1>Welcome to the Home Page</h1>;
// }

// function AboutPage() {
//   return <h1>About Page Content</h1>;
// }

// function LoginPage() {
//   return <h1>Login Page Content</h1>;
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <a href="/">Home</a> | <a href="/about">About</a> | <a href="/login">Login</a>
//         </nav>
        
//         <div className="mainContainer">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/login" element={<LoginPage />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

