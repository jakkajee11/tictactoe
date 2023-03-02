import { Col, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GameModel, GameStatus } from '../types';
import GameStats from './GameStats';

interface DataType {
  key: string;
  startAt: Date;
  endAt?: Date;
  id: number;
  status: GameStatus;
  duration: number;
}

interface GameListProps {
  data: GameModel[];
}

export default function GameList({ data }: GameListProps) {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Start',
      dataIndex: 'startAt',
      key: 'startAt',
      render: (date: Date) => <p>{date.toLocaleString()}</p>,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: GameStatus) => <p>{GameStatus[status]}</p>,
    },
    {
      title: 'End',
      dataIndex: 'endAt',
      key: 'endAt',
      render: (date?: Date) => <p>{date?.toLocaleString()}</p>,
    },
    {
      title: 'Duration (ms)',
      dataIndex: 'duration',
      key: 'duration',
      render: (num: number) => <p>{num}</p>,
    },
  ];

  const values = data?.map(
    (d) =>
      ({
        key: '1',
        startAt: d.startAt,
        endAt: d.endAt,
        id: d.id,
        status: d.status,
        duration: d.duration,
      } as DataType)
  );

  return (
    <>
      <Row>
        <Col className='gutter-row' span={6}>
          <Table columns={columns} dataSource={values} size='large' />
        </Col>
      </Row>
      <Row>
        <GameStats data={data} />
      </Row>
    </>
  );
}
