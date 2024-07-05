import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NumberBoard from './NumberBoard';
import Form from './Form';
import Home from './Home';
import SelectedNumbersList from './SelectedNumberList';

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSelect = (numbers) => {
    setSelectedNumbers(numbers);
    setShowForm(true);
  };
  
  const handleFormBack = () => {
    setShowForm(false);
  };

  return (
    <Router>
      <div className="min-h-screen  flex flex-col bg-yellow-300">
        <nav className="mb-4">
          <Link to="/" className="bg-mr-4 text-blue-500 hover:text-indigo-500">Home</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route 
            path="/number-board" 
            element={<NumberBoard onSelect={handleSelect} />} 
          />
          <Route 
            path="/form" 
            element={
              showForm ? (
                <Form
                  selectedNumbers={selectedNumbers}
                  onBack={handleFormBack}
                />
              ) : null
            }
          />
          <Route 
            path="/pirulo" 
            element={<SelectedNumbersList/>} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;







