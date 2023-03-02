import { Button, Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { GameModel, GameStatus } from '../types';

interface GameBoardProps {
  data: GameModel;
  onMark: (x: number, y: number) => void;
  onQuit: () => void;
  onNew: () => void;
}
export default function GameBoard({
  data,
  onMark,
  onNew,
  onQuit,
}: GameBoardProps) {
  const [board, setBoard] = useState(data?.board);

  const markValue = (x: number, y: number) => {
    onMark && onMark(x, y);
  };

  useEffect(() => {
    setBoard(data.board);
  }, [data]);

  return (
    <>
      {Object.keys(board).map((k, i) => (
        <Row key={k} gutter={[8, 16]}>
          {Object.values(board).map((v, j) => (
            <Col
              key={`${i}${j}`}
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
            >
              <p className='height-200'>
                <Button
                  size='large'
                  block={true}
                  style={{ height: '100px' }}
                  onClick={() => markValue(i, j)}
                  disabled={data?.status !== GameStatus.NONE}
                >
                  {board[i][j]}
                </Button>
              </p>
            </Col>
          ))}
        </Row>
      ))}
      <Row gutter={[8, 16]}>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 24, offset: 2 }}>
          <Space size={10}>
            <Button onClick={onNew} disabled={data?.status === GameStatus.NONE}>
              New
            </Button>
            <Button
              onClick={onQuit}
              disabled={
                data?.status === GameStatus.XWIN ||
                data?.status === GameStatus.OWIN ||
                data?.status === GameStatus.DRAW
              }
            >
              Quit
            </Button>
          </Space>
        </Col>
      </Row>
      {data?.status !== GameStatus.NONE && data?.status !== GameStatus.QUIT && (
        <Row gutter={[8, 16]}>
          <Col xs={{ span: 24, offset: 1 }} lg={{ span: 24, offset: 2 }}>
            <h2>{GameStatus[data.status]}!!!</h2>
          </Col>
        </Row>
      )}
    </>
  );
}
