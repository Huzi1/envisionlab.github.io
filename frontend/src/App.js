import React from "react"
import logo from './logo.svg';
import './App.css';
import Dashboard from "./charts/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  // console.log(moment("2021-02-23T10:45:19.587Z").format("MM-DDTHH:mm:ss"));
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
