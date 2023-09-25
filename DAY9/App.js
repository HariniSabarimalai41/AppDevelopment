import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Register';
import Navbar from './Navbar'; 
import Login from './Login';
import store from './store';
import Dashboard from './Dashboard';
import Search from './Search';
import Favorites from './Favorites';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard';
import MovieDetails from './MovieDetails';
import { MovieProvider } from './MovieContext';
import Genre from './Genre';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './Terms';
import AboutUs from './AboutUs';
import Faq from './Faq';
import Contact from './Contact';

const App = () => {
  return (
<Provider store={store}>
  <div>
    <Router>
    <MovieProvider>
    <Navbar /> 
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/reg" element={<Register />} />
        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/fav" element={<Favorites/>} />
        <Route exact path="/genre" element={<Genre/>} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/movie/:id" element={<MovieDetails/>} />
        <Route exact path="/terms" element={<TermsAndConditions/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    <Footer />
    </MovieProvider>
    </Router>
  </div>
</Provider>
);
};

export default App;

// import React from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from './Register';
// import Navbar from './Navbar'; 
// import Login from './Login';
// import store from './store';
// import Dashboard from './Dashboard';
// import Search from './Search';
// import Favorites from './Favorites';
// import Footer from './Footer';
// import MovieList from './MovieList';
// import PrivacyPolicy from './PrivacyPolicy';
// import TermsAndConditions from './Terms';
// import AboutUs from './AboutUs';
// import Faq from './Faq';
// import Contact from './Contact';
// import AdminDashboard from './AdminDashboard';

// const App = () => {
//   return (
// <Provider store={store}>
//   <div>
//     <Router>
//     <Navbar /> 
//       <Routes>
//         <Route exact path="/" element={<Login />} />
//         <Route exact path="/reg" element={<Register />} />
//         <Route exact path="/dashboard" element={<Dashboard />} />
//         <Route exact path="/search" element={<Search/>} />
//         <Route exact path="/fav" element={<Favorites/>} />
//         <Route exact path="/terms" element={<TermsAndConditions/>} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
//         <Route path="/aboutus" element={<AboutUs/>} />
//         <Route path="/faq" element={<Faq/>} />
//         <Route path="/contact" element={<Contact/>} />
//         <Route path="/admin" element={<AdminDashboard/>} />


//       </Routes>
//     <Footer/>
//     </Router>
//   </div>
// </Provider>
// );
// };

// export default App;