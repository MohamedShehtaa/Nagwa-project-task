
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Question from './pages/Question'
import YourScore from './pages/YourScore'

function App() {
  return (
    <div >
      <Routes>
        <Route path="/">
          <Route index element={ <Question /> } />
          <Route path="/rank" element={ < YourScore /> } />
        </Route>
        <Route path="*" element={ < p>Page Not Found </p> } />
      </Routes>

    </div>
  );
}

export default App;
