//import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routesr from './routes/routes'
// import Pie from './Components/Graphs/piechart'
// import BarChart from './Components/Graphs/barChart'

function App() {
  return (
    <BrowserRouter>
      <Routesr />
    </BrowserRouter>
  );
}

export default App;
