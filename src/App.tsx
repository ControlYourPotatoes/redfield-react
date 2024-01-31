
import './App.css'
import { MuiTypography } from './components/MuiTypography';
import HurricaneMap from './components/Dashboard/HurricaneMap'; // Updated import
import PuertoRicoMap from './components/PuertoRicoMap';

function App() {
  const initialLat = 18.2208; // Example latitude
  const initialLng = -66.5901; // Example longitude

  return (
    <div className='App'>
      <HurricaneMap initialLat={initialLat} initialLng={initialLng} />
      <PuertoRicoMap />
    </div>
  );
}

export default App
