import { useState } from 'react';
import './App.css';
import CovidChart from './CovidChart/covidChart';
import * as data from './CovidChart/data';
import drawChart from './CovidChart/DrawChart';
import Dropdown from './CovidChart/Dropdown';

const App = () => {
  const [stateIndex, updateIndex] = useState(2);

  return (
    <div className="App">
      <Dropdown
        stateIndex={stateIndex}
        onClick={updateIndex}
        statesList={data.map((d) => d.name)}
      ></Dropdown>
      <CovidChart data={data[stateIndex]} drawChart={drawChart}></CovidChart>
    </div>
  );
};

export default App;
