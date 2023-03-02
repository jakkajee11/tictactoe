import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Board, GameModel, GameStatus, Player } from '../types';
import GameBoard from './GameBoard';
import GameList from './GameList';
import { saveGame as save, getGames } from '../API';

const initEmptyBoard = (): Board => ({
  0: ['', '', ''],
  1: ['', '', ''],
  2: ['', '', ''],
});

const initGame = (): GameModel => ({
  id: 0,
  startAt: new Date(),
  player: Player.O,
  status: GameStatus.NONE,
  board: initEmptyBoard(),
});

export default function Game() {
  const [game, setGame] = useState(initGame());
  const [gameRecords, setGameRecords] = useState<GameModel[]>([]);
  const [count, setCount] = useState(0);

  const getStatus = (arr: string[]) => {
    if (arr.every((v) => v === Player[Player.O])) {
      return GameStatus.OWIN;
    }

    if (arr.every((v) => v === Player[Player.X])) {
      return GameStatus.XWIN;
    }

    return GameStatus.NONE;
  };

  const evaluateGame = (): GameStatus => {
    const { board } = game;
    // x
    const length = Object.keys(board).length;
    let status = GameStatus.NONE;
    for (let i = 0; i < length; i++) {
      status = getStatus(board[i]);
      if (status === GameStatus.OWIN) {
        break;
      }
      if (status === GameStatus.XWIN) {
        break;
      }
    }

    if (status !== GameStatus.NONE) return status;

    // y
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(board[i][0]);
    }
    status = getStatus(result);

    if (status !== GameStatus.NONE) return status;

    result = [];
    for (let i = 0; i < length; i++) {
      result.push(board[i][1]);
    }
    status = getStatus(result);

    if (status !== GameStatus.NONE) return status;

    result = [];
    for (let i = 0; i < length; i++) {
      result.push(board[i][2]);
    }
    status = getStatus(result);

    if (status !== GameStatus.NONE) return status;

    // xy
    result = [];
    result.push(board[0][0]);
    result.push(board[1][1]);
    result.push(board[2][2]);

    status = getStatus(result);

    if (status !== GameStatus.NONE) return status;

    result = [];
    result.push(board[2][0]);
    result.push(board[1][1]);
    result.push(board[0][2]);

    status = getStatus(result);

    if (status !== GameStatus.NONE) return status;

    if (!Object.values(board).some((x) => x.some((v) => v === '')))
      return GameStatus.DRAW;

    return status;
  };

  const markValue = (x: number, y: number) => {
    const player = game.player;
    const cell = game.board[x][y];
    if (cell === '') {
      game.board[x][y] = Player[game.player];
      game.player = player === Player.O ? Player.X : Player.O;

      if (count >= 4) {
        game.status = evaluateGame();
      }
      setCount((prev) => prev + 1);
      setGame(game);
      if (game.status !== GameStatus.NONE) {
        //saveGame();
        saveGameApi();
      }
    }
  };

  const newGame = () => {
    saveGame();
    reset();
  };

  const newGameApi = () => {
    saveGame();
    reset();
  };

  const saveGame = () => {
    const endAt = new Date();
    const diff = endAt.getTime() - game.startAt.getTime();
    var minDiff = diff;
    game.id = gameRecords.length;
    game.endAt = endAt;
    game.duration = minDiff;

    setGameRecords((prev) => [...prev, game]);
  };

  const fetchGamesApi = async () => {
    const res = await getGames();

    return res.data as GameModel[];
  };

  const saveGameApi = async () => {
    await save(game);
    const games = await fetchGamesApi();
    setGameRecords(games);
  };

  const quitGame = () => {
    game.status = GameStatus.QUIT;
    saveGame();
    reset();
  };

  const quitGameApi = () => {
    game.status = GameStatus.QUIT;
    saveGameApi();
    reset();
  };

  const reset = () => {
    setGame(initGame());
    setCount(0);
  };

  const loadInitData = async () => {
    const data = await fetchGamesApi();
    setGameRecords(data);
  };

  useEffect(() => {
    loadInitData();
  }, []);

  return (
    <div className='game-container'>
      <h1>Tic Tac Toe</h1>
      <Row gutter={16}>
        <Col className='gutter-row' span={12}>
          <GameBoard
            data={game}
            onMark={markValue}
            onNew={newGameApi}
            onQuit={quitGameApi}
          />
        </Col>
        <Col className='gutter-row' span={12}>
          <GameList data={gameRecords} />
        </Col>
      </Row>
    </div>
  );
}
