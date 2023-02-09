import React from 'react';

import WeatherCard from '../WeatherCard/WeatherCard';
import Settings from '../SettingsWidget/Settings';
import ModalLocation from '../ModalLocation/ModalLocation';
import { AppContext, WeatherContext } from '../../App';
import { FiSettings } from 'react-icons/fi';

import './index.scss';

const WeatherWidget: React.FC = () => {
  const { cities, setCities, activeModal, activeSettings, setActiveSettings } = React.useContext<AppContext>(WeatherContext);

  React.useEffect(() => {
    if (activeModal) {
      const citiesLS = localStorage.getItem('cities').split(',');
      if (citiesLS[0] !== '') {
        return setCities(citiesLS);
      }
    }
  }, [activeModal]);

  if (!activeModal) {
    return <ModalLocation />;
  }

  if (activeSettings) {
    return <Settings />;
  }

  return (
    <div className="weather">
      {cities.length > 0 ? cities.map((item, i) => <WeatherCard key={i} city={item} />) : <p className="weather__absent">Location not selected</p>}
      <div className="weather__settings" onClick={() => setActiveSettings((prev: boolean) => !prev)}>
        <FiSettings />
      </div>
    </div>
  );
};

export default WeatherWidget;
