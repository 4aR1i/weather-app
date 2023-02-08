import axios from 'axios';
import useAxios from 'axios-hooks';

export const useWeatherApi = (city: string) => {
  const [{ data, loading, error }] = useAxios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b890c41902780c1957c7c89885be6c3&units=metric`);
  return { data, loading, error };
};

export const requestWeather = async (city: string) => {
  const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b890c41902780c1957c7c89885be6c3&units=metric`);
  return data;
};
