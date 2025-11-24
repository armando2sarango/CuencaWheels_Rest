import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import PagosView from './PagosView';

// Importamos los 3 thunks de lectura
import { fetchPagos, fetchPagoById, fetchPagosByReserva } from '../../store/pagos/thunks';
import { isAdmin } from '../../services/auth'; 

const PagosPage = () => {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((state) => state.pagos || {});
  const esAdministrador = isAdmin();

  useEffect(() => {
    if (esAdministrador) {
      dispatch(fetchPagos());
    } else {
      message.error("Acceso denegado.");
    }
  }, [dispatch, esAdministrador]);

  const handleRefresh = () => {
    dispatch(fetchPagos()); 
  };
  const handleBuscar = (filtros) => {
    if (filtros.idPago) {
        dispatch(fetchPagoById(filtros.idPago));
    } 
    else if (filtros.idReserva) {
        dispatch(fetchPagosByReserva(filtros.idReserva));
    } 
    else {
        handleRefresh();
    }
  };
  const pagosFiltrados = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter(pago => pago.Estado === 'Exitoso' || pago.aprobado === true);
  }, [items]);

  if (!esAdministrador) return <div>No autorizado</div>;

  return (
    <PagosView 
      pagos={pagosFiltrados} 
      loading={loading} 
      onRefresh={handleRefresh}
      onBuscar={handleBuscar} 
    />
  );
};

export default PagosPage;