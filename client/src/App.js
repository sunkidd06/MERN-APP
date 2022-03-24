import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Auth from './views/Auth';
import AuthContextProvider from './contexts/authContext';
import PostContextProvider from './contexts/postContext';
import DashBoard from './views/DashBoard';
import About from './views/About';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='' element={<Auth authorRouter='login' />} />
              <Route path='login' element={<Auth authorRouter='login' />} />
              <Route path='register' element={<Auth authorRouter='register' />} />
              <Route path='dashboard' element={<DashBoard />} />
              <Route path='about' element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
