import axios from 'axios';
import { GameModel, SaveGameModel } from './types';

const instance = axios.create({
  baseURL: 'https://localhost:7127/api',
});

const getGames = async () => await instance.get('games');
const saveGame = async (payload: SaveGameModel) =>
  await instance.post('games', payload);

export { getGames, saveGame };
