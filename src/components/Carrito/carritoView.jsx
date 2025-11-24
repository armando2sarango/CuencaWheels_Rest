import React from 'react';
import { 
  Table, Card, Button, Typography, Space, Image, Empty, Tag, Divider, Row, Col 
} from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const CarritoView = ({ 
  items = [], 
  loading, 
  error, 
  onEliminar, 
  onReservar,
  totalGeneral 
}) => {
  const columns = [
    {
      title: 'Vehículo',
      dataIndex: 'UrlImagen', 
      key: 'imagen',
      width: 100,
      render: (url, record) => (
        <div style={{ textAlign: 'center' }}>
            <Image 
                width={80} 
                src={url} 
                // Imagen por defecto si no viene en el JSON
                fallback="https://via.placeholder.com/150?text=Auto" 
                alt={record.VehiculoNombre}
                style={{ borderRadius: '8px' }}
            />
        </div>
      ),
    },
    {
      title: 'Detalles',
      key: 'detalles',
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: '16px' }}>{record.VehiculoNombre}</Text>
          <br />
          {record.Marca && <Text type="secondary">{record.Marca} {record.Modelo}</Text>}
        </div>
      ),
    },
    {
      title: 'Fechas de Renta',
      key: 'fechas',
      render: (_, record) => {
        const inicio = dayjs(record.FechaInicio);
        const fin = dayjs(record.FechaFin);
        const dias = fin.diff(inicio, 'day') + 1;
        
        return (
          <div>
            <p style={{ margin: 0 }}><small>Desde:</small> <strong>{inicio.format('DD/MM/YYYY')}</strong></p>
            <p style={{ margin: 0 }}><small>Hasta:</small> <strong>{fin.format('DD/MM/YYYY')}</strong></p>
            <Tag color="orange" style={{ marginTop: 4 }}>{dias} {dias === 1 ? 'día' : 'días'}</Tag>
          </div>
        );
      }
    },
    {
      title: 'Precio',
      key: 'precio',
      align: 'right',
      render: (_, record) => {
        const subtotal = parseFloat(record.Subtotal || 0);

        return (
          <div>
            <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>${subtotal.toFixed(2)}</Text>
          </div>
        );
      }
    },
    {
      title: 'Acción',
      key: 'accion',
      align: 'center',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => onEliminar(record.IdItem)} 
        >
          Eliminar
        </Button>
      ),
    },
  ];
  const totalCalculado = items.reduce((acc, item) => acc + (item.Subtotal || 0), 0);

  if (loading && items.length === 0) {
    return <div style={{ padding: 50, textAlign: 'center' }}>Cargando carrito...</div>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}><ShoppingCartOutlined /> Mi Carrito</Title>
      
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {items.length === 0 ? (
            <Empty 
                description="Tu carrito está vacío" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                style={{ background: '#fff', padding: '40px', borderRadius: '8px' }}
            >
                <Button type="primary" href="/autos">Ir a ver Autos</Button>
            </Empty>
          ) : (
            <Table 
              dataSource={items} 
              columns={columns} 
              rowKey={(record) => record.IdItem || Math.random()} 
              pagination={false}
              scroll={{ x: 600 }}
              style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}
            />
          )}
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Resumen del Pedido" style={{ position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text>Subtotal ({items.length} vehículos):</Text>
              <Text>${totalCalculado.toFixed(2)}</Text>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Title level={4}>Total:</Title>
              <Title level={4} type="success">${totalCalculado.toFixed(2)}</Title>
            </div>
            
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<CalendarOutlined />} 
              disabled={items.length === 0}
              onClick={onReservar} 
              style={{ marginTop: '15px', height: '50px', fontSize: '18px' }}
            >
              Generar Reserva
            </Button>
            <Button type="link" block href="/autos" style={{ marginTop: 10 }}>
              Seguir buscando
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarritoView;