import { useEffect, useState } from 'react';
import './App.css';
import CovidChart from './covidChart';
import * as data from './data';
import Dropdown from './Dropdown';

const App = () => {
  const [stateIndex, updateIndex] = useState(2);

  const drawChart = (stateData) => <CovidChart data={stateData}></CovidChart>;

  useEffect(() => {
    drawChart(data[stateIndex]);
  }, [stateIndex]);

  return (
    <div className="App">
      <Dropdown
        stateIndex={stateIndex}
        onClick={updateIndex}
        statesList={data.map((d) => d.name)}
      ></Dropdown>
      {drawChart(data[stateIndex])}
    </div>
  );
};

export default App;
