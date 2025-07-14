import axios from 'axios';

export const fetchRooms = async () => {
  const response = await axios.get('/api/room');
  return response.data;
};
