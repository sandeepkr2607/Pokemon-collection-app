import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyCollection from './pages/MyCollection';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-collection' element={<MyCollection />} />
      </Routes>
    </>
  );
}

export default App;
