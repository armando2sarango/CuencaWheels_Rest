import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import FacturasView from './facturasView';
import { 
  fetchfacturas, 
  createFacturaThunk, 
  updateFacturaThunk, 
  deleteFacturaThunk 
} from '../../store/facturas/thunks';

const FacturasPage = () => {
  const dispatch = useDispatch();
  
  // Asegúrate de que en tu store.js el reducer se llame 'facturas'
  const { facturas, loading, error } = useSelector(state => state.facturas);

  useEffect(() => {
    dispatch(fetchfacturas());
  }, [dispatch]);

  const handleCrear = async (factura) => {
    try {
      await dispatch(createFacturaThunk(factura)).unwrap();
      message.success("Factura creada correctamente");
      dispatch(fetchfacturas());
      return true;
    } catch (err) {
      console.error(err);
      message.error("Error al crear factura");
      return false;
    }
  };

  const handleEditar = async (factura) => {
    try {
      await dispatch(updateFacturaThunk({
        idFactura: factura.IdFactura,
        body: factura
      })).unwrap();
      message.success("Factura actualizada correctamente");
      dispatch(fetchfacturas());
      return true;
    } catch (err) {
      console.error(err);
      message.error("Error al actualizar factura");
      return false;
    }
  };

  const handleEliminar = async (id) => {
    try {
      const result = await dispatch(deleteFacturaThunk(id)).unwrap();
      if (result.success) {
        message.success("Factura eliminada correctamente");
      } else {
        message.error("No se pudo eliminar la factura");
      }
      return true; // El slice actualiza el estado localmente, no es estrictamente necesario recargar
    } catch (err) {
      console.error(err);
      message.error("Error al eliminar factura");
      return false;
    }
  };

  return (
    <FacturasView
      facturas={facturas}
      loading={loading}
      error={error}
      onCrear={handleCrear}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
};

export default FacturasPage;