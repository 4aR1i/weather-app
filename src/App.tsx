import React from 'react';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';

export type AppContext = {
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  activeSettings: boolean;
  setActiveSettings: React.Dispatch<React.SetStateAction<boolean>>;
  activeModal: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WeatherContext = React.createContext<AppContext | null>(null);

function App() {
  const [activeSettings, setActiveSettings] = React.useState<boolean>(false);
  const [cities, setCities] = React.useState<string[]>([]);
  const [activeModal, setActiveModal] = React.useState<any>(localStorage.getItem('first_time'));

  return (
    <WeatherContext.Provider value={{ cities, setCities, activeSettings, setActiveSettings, activeModal, setActiveModal }}>
      <WeatherWidget />
    </WeatherContext.Provider>
  );
}

export default App;
