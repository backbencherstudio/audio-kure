import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      
      <audio controls>
        <source src="https://www.dropbox.com/scl/fi/n7n5swrmwc7j566ma6kdb/file_example_MP3_5MG.mp3?rlkey=tckycf4ciob0tfdyzrspwo80z&st=4prulsix&dl=1" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
z
export default App;
