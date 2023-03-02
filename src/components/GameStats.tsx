import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GameModel, GameStatus } from '../types';

interface DataType {
  key: string;
  owin: number;
  xwin: number;
  draw: number;
  quit: number;
}

interface GameStatsProps {
  data: GameModel[];
}
export default function GameStats({ data }: GameStatsProps) {
  const columns: ColumnsType<DataType> = [
    {
      title: 'OWIN',
      dataIndex: 'owin',
      key: 'owin',
      render: (num: number) => <p>{num.toFixed(2)}%</p>,
    },
    {
      title: 'XWIN',
      dataIndex: 'xwin',
      key: 'xwin',
      render: (num: number) => <p>{num.toFixed(2)}%</p>,
    },
    {
      title: 'DRAW',
      dataIndex: 'draw',
      key: 'draw',
      render: (num: number) => <p>{num.toFixed(2)}%</p>,
    },
    {
      title: 'QUIT',
      dataIndex: 'quit',
      key: 'quit',
      render: (num: number) => <p>{num.toFixed(2)}%</p>,
    },
  ];

  const length = data?.length ?? 0;
  const xwin = data?.filter((x) => x.status === GameStatus.XWIN).length ?? 0;
  const owin = data?.filter((x) => x.status === GameStatus.OWIN).length ?? 0;
  const draw = data?.filter((x) => x.status === GameStatus.DRAW).length ?? 0;
  const quit = data?.filter((x) => x.status === GameStatus.QUIT).length ?? 0;

  const values: DataType[] =
    length > 0
      ? [
          {
            key: '1',
            owin: (owin / length) * 100,
            xwin: (xwin / length) * 100,
            draw: (draw / length) * 100,
            quit: (quit / length) * 100,
          },
        ]
      : [];

  return (
    <>
      <Row gutter={1}>
        <Col className='gutter-row' span={6}>
          <Table columns={columns} dataSource={values} pagination={false} />
        </Col>
      </Row>
    </>
  );
}
