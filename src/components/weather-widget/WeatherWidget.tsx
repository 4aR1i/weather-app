import React from 'react';

import WeatherItem from '../weather-item/WeatherItem';
import Settings from '../settings-widget/Settings';
import ModalLocation from '../modal-location/ModalLocation';
import { FiSettings } from 'react-icons/fi';

import './index.scss';

export const AppContext = React.createContext({});

const WeatherWidget: React.FC = () => {
  const [activeSettings, setActiveSettings] = React.useState<boolean>(false);
  const [cities, setCities] = React.useState<string[]>([]);
  const [activeModal, setActiveModal] = React.useState<boolean>(true);

  React.useEffect(() => {
    const activeModalLs = localStorage.getItem('first_time');
    setActiveModal(activeModalLs === 'false' ? false : true);
    if (!activeModal) {
      const citiesLS = localStorage.getItem('cities');
      setCities(citiesLS.split(','));
    }
  }, [activeModal]);

  if (activeModal) {
    return (
      <AppContext.Provider value={{ setActiveModal, setCities }}>
        <ModalLocation />
      </AppContext.Provider>
    );
  }

  if (activeSettings) {
    return (
      <AppContext.Provider value={{ cities, setCities, setActiveSettings }}>
        <Settings />
      </AppContext.Provider>
    );
  }

  return (
    <div className="weather">
      {cities.map((item, i) => (
        <WeatherItem key={i} city={item} />
      ))}
      <div className="weather__settings" onClick={() => setActiveSettings((prev: boolean) => !prev)}>
        <FiSettings />
      </div>
    </div>
  );
};

export default WeatherWidget;
