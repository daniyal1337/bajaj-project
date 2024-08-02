import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://heroku-sigma.vercel.app/', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            alert('Invalid JSON input');
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="App">
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder="Enter JSON" required />
                
                <button className='btn' type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <label>Filter Results:</label>
                    <select multiple={true} value={selectedOptions} onChange={handleSelectChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('highest_alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
