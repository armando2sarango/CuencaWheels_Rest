import React from 'react';
import { Table, Card, Tag, Button, Typography, Empty, Space, Form, InputNumber } from 'antd';
import { 
  DollarOutlined, 
  SyncOutlined, 
  BankOutlined, 
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined, 
  ClearOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const PagosView = ({ 
  pagos = [], 
  loading, 
  onRefresh,
  onBuscar 
}) => {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    onBuscar(values);
  };

  const handleLimpiar = () => {
    form.resetFields();
    onRefresh(); 
  };

  const columns = [
    {
      title: 'ID Pago',
      dataIndex: 'IdPago',
      key: 'id',
      width: 80,
      render: (text) => <Text type="secondary">#{text}</Text>
    },
    {
      title: 'Reserva',
      dataIndex: 'IdReserva',
      key: 'reserva',
      render: (idReserva) => (
        <Space>
          <FileTextOutlined />
          <Text strong>#{idReserva}</Text>
        </Space>
      )
    },
    {
      title: 'Fecha',
      dataIndex: 'FechaPago',
      key: 'fecha',
      render: (fecha) => (
        <span>
          <CalendarOutlined style={{ marginRight: 5, color: '#8c8c8c' }} />
          {dayjs(fecha).format('DD/MM/YYYY HH:mm')}
        </span>
      )
    },
    {
      title: 'Método',
      dataIndex: 'Metodo',
      key: 'metodo',
      render: (metodo) => {
        let color = 'blue';
        let icon = <BankOutlined />;
        
        if (metodo === 'Efectivo') {
            color = 'green';
            icon = <DollarOutlined />;
        }
        
        return (
          <Tag icon={icon} color={color}>
            {metodo?.toUpperCase() || 'DESCONOCIDO'}
          </Tag>
        );
      }
    },
    {
      title: 'Referencia',
      dataIndex: 'ReferenciaExterna',
      key: 'referencia',
      render: (ref) => <Text copyable>{ref || 'N/A'}</Text>
    },
    {
      title: 'Monto',
      dataIndex: 'Monto',
      key: 'monto',
      align: 'right',
      render: (monto) => (
        <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
          ${parseFloat(monto).toFixed(2)}
        </Text>
      )
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'estado',
      align: 'center',
      render: (estado) => (
        <Tag color={estado === 'Exitoso' ? 'success' : 'error'}>
          {estado?.toUpperCase()}
        </Tag>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      
      <Card style={{ marginBottom: 20 }} bodyStyle={{ padding: '15px' }}>
        <Form 
            form={form} 
            layout="inline" 
            onFinish={handleFinish}
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
            <Form.Item name="idPago" label="# Pago">
                <InputNumber placeholder="#" style={{ width: 100 }} min={1} />
            </Form.Item>

            <Form.Item name="idReserva" label="# Reserva">
                <InputNumber placeholder="#" style={{ width: 100 }} min={1} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Buscar
                </Button>
            </Form.Item>
            
            <Form.Item>
                <Button onClick={handleLimpiar} icon={<ClearOutlined />}>
                    Limpiar
                </Button>
            </Form.Item>
        </Form>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Historial de Pagos (Ingresos)</Title>
        <Button icon={<SyncOutlined />} onClick={onRefresh}>Actualizar</Button>
      </div>

      <Card>
        <Table 
          dataSource={pagos} 
          columns={columns} 
          rowKey="IdPago" 
          loading={loading}
          locale={{ emptyText: <Empty description="No se han registrado pagos aún" /> }}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default PagosView;
