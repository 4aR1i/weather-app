import React from 'react';

import { AiOutlineEnter } from 'react-icons/ai';
import { AppContext, WeatherContext } from '../../App';
import { requestWeather } from '../../actions/weatherAPI';

import './index.scss';

const ModalLocation = () => {
  const { setActiveModal, setCities } = React.useContext<AppContext>(WeatherContext);
  const [locationValue, setLocationValue] = React.useState<string>('');
  const [warning, setWarning] = React.useState<boolean>(false);

  const enterLocation = async () => {
    await requestWeather(locationValue)
      .then(() => {
        localStorage.setItem('cities', locationValue);
        localStorage.setItem('first_time', 'true');
        setCities((prev: string[]) => [...prev, locationValue]);
        setActiveModal(true);
      })
      .catch(() => {
        setWarning(true);
      });
  };

  React.useEffect(() => {
    setWarning(false);
  }, [locationValue]);

  return (
    <div className="modal-location">
      <label htmlFor="#location">Location:</label>
      <div className="modal-location__enter">
        <input type="text" id="location" className={warning ? 'warning' : ''} onChange={(e) => setLocationValue(e.target.value)} value={locationValue} placeholder="Enter your location" />
        <AiOutlineEnter onClick={enterLocation} />
      </div>
      {warning ? <p className="modal-warning">Location not found.</p> : ''}
    </div>
  );
};

export default ModalLocation;
