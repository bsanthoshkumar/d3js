import './App.css';
import CovidChart from './covidChart';
import * as data from './data';

const App = () => {
  return (
    <div className="App">
      <CovidChart data={data.slice(0, 5)}></CovidChart>
    </div>
  );
};

export default App;
