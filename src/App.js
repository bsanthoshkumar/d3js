import { useEffect, useState } from 'react';
import './App.css';
import CovidChart from './CovidChart/covidChart';
import * as data from './CovidChart/data';
import Dropdown from './CovidChart/Dropdown';

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
