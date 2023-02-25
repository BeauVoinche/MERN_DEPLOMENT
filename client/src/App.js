import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import CreatePage from './views/CreatePage'
import Main from './views/Main'


function App() {
  return (
    <div className="container mt-5">
      <h1 className='text-center'>Project Manager</h1>
      <hr></hr>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
