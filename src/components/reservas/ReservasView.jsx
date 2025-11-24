import React, { useState } from 'react';
import { 
  Table, Card, Tag, Button, Space, Popconfirm, Tooltip, Typography, Empty, Modal, Form, InputNumber, Select 
} from 'antd';
import { 
  CloseCircleOutlined, 
  DeleteOutlined, 
  SyncOutlined, 
  CarOutlined,
  CheckOutlined,
  FlagOutlined,
  BankOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const ReservasView = ({ 
  reservas = [], 
  loading, 
  esAdmin, 
  onEliminar, 
  onCambiarEstado, 
  onRefresh,
  onVerPagos
}) => {
  // --- ESTADOS PARA EL MODAL DE PAGO ---
  const [modalPagoVisible, setModalPagoVisible] = useState(false);
  const [reservaAFinalizar, setReservaAFinalizar] = useState(null);
  const [formPago] = Form.useForm();
  const [metodoPago, setMetodoPago] = useState('Banco'); 

  const getColorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'confirmada': return 'green';
      case 'aprobada': return 'green'; 
      case 'pendiente': return 'orange';
      case 'rechazada': return 'red';
      case 'finalizada': return 'blue';
      case 'cancelada': return 'default';
      default: return 'default';
    }
  };

  const abrirModalPago = (record) => {
    setReservaAFinalizar(record);
    setMetodoPago('Banco'); 
    formPago.resetFields();
    formPago.setFieldsValue({
        Monto: record.Total,
        Metodo: 'Banco',
        CuentaComercio: 999999 
    });
    setModalPagoVisible(true);
  };

  const handleConfirmarPago = async () => {
    try {
        const valoresPago = await formPago.validateFields();
        await onCambiarEstado(
            reservaAFinalizar.IdReserva, 
            'Finalizada', 
            reservaAFinalizar, 
            valoresPago 
        );
        
        setModalPagoVisible(false);
        setReservaAFinalizar(null);
        formPago.resetFields();
    } catch (error) {
        console.error("Validación fallida:", error);
    }
  };

  // --- DEFINICIÓN DINÁMICA DE COLUMNAS ---
  const baseColumns = [
    { title: 'ID', dataIndex: 'IdReserva', width: 60, key: 'id' },
    {
      title: 'Vehículo',
      key: 'vehiculo',
      render: (_, record) => (
        <Space>
          <CarOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
          <div>
            <Text strong>{record.VehiculoNombre || record.Modelo || 'Vehículo'}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
               {record.Marca ? `${record.Marca}` : `ID Auto: ${record.IdVehiculo}`}
            </Text>
          </div>
        </Space>
      ),
    },
    // 1. Columna Cliente: SOLO visible si es Admin
    {
      title: 'Cliente',
      key: 'cliente',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong>
                {record.NombreUsuario || record.nombreUsuario || `ID: ${record.IdUsuario}`}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.CorreoUsuario || record.email}
            </Text>
        </div>
      )
    },
    {
      title: 'Fechas',
      key: 'fechas',
      render: (_, record) => (
        <div>
          <Text>Del: {dayjs(record.FechaInicio).format('DD/MM/YYYY')}</Text>
          <br />
          <Text>Al: {dayjs(record.FechaFin).format('DD/MM/YYYY')}</Text>
        </div>
      )
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      key: 'total',
      render: (valor) => <Text strong>${parseFloat(valor || 0).toFixed(2)}</Text>
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={getColorEstado(estado)}>
          {estado ? estado.toUpperCase() : 'DESCONOCIDO'}
        </Tag>
      )
    },
    // 2. Columna Acciones: Visible para Admin Y Cliente (si tiene acción de cancelar)
    {
      title: 'Acciones',
      key: 'acciones',
      width: 160,
      render: (_, record) => {
        const estado = record.Estado ? record.Estado.toLowerCase() : '';

        return (
          <Space size="small">
            {!esAdmin && (estado === 'confirmada' || estado === 'finalizada' || estado === 'aprobada') && (
                <Tooltip title="Ver Pagos Registrados">
                    <Button 
                        type="link" 
                        icon={<DollarOutlined />} 
                        style={{ color: '#52c41a', paddingLeft: 0, paddingRight: 0 }}
                        onClick={() => onVerPagos(record.IdReserva)} // <-- LLAMAR A LA FUNCIÓN
                    >
                        Ver Pago
                    </Button>
                </Tooltip>
            )}

            {/* CLIENTE: SOLO ve el botón Cancelar si está pendiente */}
            {!esAdmin && estado === 'pendiente' && (
              <Popconfirm title="¿Cancelar reserva?" onConfirm={() => onEliminar(record.IdReserva)}>
                <Button danger size="small" icon={<DeleteOutlined />}>Cancelar</Button>
              </Popconfirm>
            )}

            {/* ADMIN: Todos los botones */}
            {esAdmin && estado === 'pendiente' && (
              <>
                <Tooltip title="Confirmar">
                  <Button type="primary" shape="circle" size="small" icon={<CheckOutlined />} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} onClick={() => onCambiarEstado(record.IdReserva, 'Confirmada', record)} />
                </Tooltip>
                <Tooltip title="Rechazar">
                  <Button type="primary" danger shape="circle" size="small" icon={<CloseCircleOutlined />} onClick={() => onCambiarEstado(record.IdReserva, 'Rechazada', record)} />
                </Tooltip>
              </>
            )}

            {esAdmin && (estado === 'confirmada' || estado === 'aprobada') && (
               <Tooltip title="Finalizar y Cobrar">
                 <Button size="small" type="primary" ghost icon={<FlagOutlined />} onClick={() => abrirModalPago(record)}>
                   Finalizar
                 </Button>
               </Tooltip>
            )},
            

            {esAdmin && (estado === 'rechazada' || estado === 'cancelada' || estado === 'finalizada') && (
               <Popconfirm title="Borrar historial" onConfirm={() => onEliminar(record.IdReserva)}>
                  <Button type="text" danger size="small" icon={<DeleteOutlined />} />
               </Popconfirm>
            )}
            
          </Space>
        );
      }
    }
  ];

  // Filtramos las columnas según el rol
  const finalColumns = baseColumns.filter(col => {
      // Si no es admin, ocultamos la columna 'Cliente'
      if (col.key === 'cliente' && !esAdmin) return false;
      
      // Si no es admin, ocultamos la columna 'Acciones' solo si NO es un estado pendiente
      // (Para mantener el botón de Cancelar del cliente si está Pendiente)
      if (col.key === 'acciones' && !esAdmin) {
          // Si el cliente no tiene ninguna acción disponible, podríamos ocultar la columna
          // Pero la dejamos visible para que el botón de cancelar dentro se maneje.
          // Aquí podríamos poner una lógica más compleja si quisiéramos ocultar la columna si no hay NADA que hacer.
          // Por ahora, la dejamos visible para el cliente si hay alguna acción que hacer (como cancelar).
      }
      
      return true;
  });

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>{esAdmin ? "Gestión de Reservas (Admin)" : "Mis Reservas"}</Title>
        <Button icon={<SyncOutlined />} onClick={onRefresh}>Actualizar</Button>
      </div>

      <Card>
        <Table 
          dataSource={reservas} 
          columns={finalColumns} // Usamos las columnas filtradas
          rowKey="IdReserva" 
          loading={loading}
          locale={{ emptyText: <Empty description="No hay reservas" /> }}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* --- MODAL DE PAGO MEJORADO --- */}
      <Modal
        title="Finalizar Renta y Registrar Pago"
        open={modalPagoVisible}
        onOk={handleConfirmarPago}
        onCancel={() => setModalPagoVisible(false)}
        okText="Procesar Pago"
        cancelText="Cancelar"
      >
        <Form form={formPago} layout="vertical">
            
            {/* 1. Selector de Método */}
            <Form.Item 
                name="Metodo" 
                label="Método de Pago" 
                rules={[{ required: true }]}
            >
                <Select onChange={(value) => setMetodoPago(value)}>
                    <Select.Option value="Banco">Transferencia Bancaria</Select.Option>
                    <Select.Option value="Efectivo">Efectivo</Select.Option>
                </Select>
            </Form.Item>

            {/* 2. Campos Bancarios (Condicionales) */}
            {metodoPago === 'Banco' && (
                <>
                    <div style={{ background: '#e6f7ff', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                        <small>Ingrese cuentas válidas para verificar la transacción.</small>
                    </div>
                    <Form.Item 
                        name="CuentaCliente" 
                        label="Cuenta del Cliente" 
                        rules={[{ required: true, message: 'Requerido para transferencia' }]}
                    >
                        <InputNumber style={{ width: '100%' }} prefix={<BankOutlined />} placeholder="Ej: 100500..." />
                    </Form.Item>

                    <Form.Item 
                        name="CuentaComercio" 
                        label="Cuenta Empresa" 
                        rules={[{ required: true, message: 'Requerido para transferencia' }]}
                    >
                        <InputNumber style={{ width: '100%' }} prefix={<BankOutlined />} />
                    </Form.Item>
                </>
            )}

            {/* 3. Mensaje Efectivo */}
            {metodoPago === 'Efectivo' && (
                <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> <strong>Pago en Efectivo</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                        El sistema registrará el pago inmediatamente y generará la factura.
                    </p>
                </div>
            )}

            <Form.Item name="Monto" label="Monto a Cobrar ($)">
                <InputNumber style={{ width: '100%' }} prefix={<DollarOutlined />} disabled />
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReservasView;