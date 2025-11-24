import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutosView from './AutosView';
import { createCarritoThunk } from '../../store/carrito/thunks';
import { useNavigate } from 'react-router-dom';
import { fetchVehiculos, createVehiculoThunk, updateVehiculoThunk, deleteVehiculoThunk,buscarVehiculosThunk} from '../../store/autos/thunks';
import { message,notification } from 'antd';
import { getUserId,setCarritoId,isAdmin,isAuthenticated} from '../../services/auth';
const AutosPage = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
 const [api, contextHolder] = notification.useNotification();
  const autosState = useSelector((state) => state.autos);
  
  let vehicles = [];
  if (autosState?.items) {
    if (Array.isArray(autosState.items)) {
      vehicles = autosState.items;
    } else if (autosState.items && typeof autosState.items === 'object') {
      vehicles = [autosState.items];
    }
  }
  const esAdministrador = isAdmin(); 
  const loading = autosState?.loading || false;
  const error = autosState?.error || null;

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = () => {
    dispatch(fetchVehiculos());
  };
  const handleBuscar = async (filtros) => {
    try {
      // filtros trae: { categoria: 'Sedán', transmision: 'Manual', estado: 'Disponible' }
      await dispatch(buscarVehiculosThunk(filtros)).unwrap();
      // No hace falta message.success, solo se actualiza la lista
    } catch (error) {
      console.error(error);
      message.error("Error al realizar la búsqueda");
    }
  };

  const handleCrear = async (vehiculoData) => {
    try {
      const resultado = await dispatch(createVehiculoThunk(vehiculoData)).unwrap();
      dispatch(fetchVehiculos());
      return true;
    } catch (error) {
      message.error('Error al crear el vehículo: ' + (error.message || 'Error desconocido'));
      return false;
    }
  };

  const handleEditar = async (id, vehiculoData) => {
    try {
      const resultado = await dispatch(updateVehiculoThunk({ id, body: vehiculoData })).unwrap();
      dispatch(fetchVehiculos());
      return true;
    } catch (error) {
      message.error('Error al actualizar el vehículo: ' + (error.message || 'Error desconocido'));
      return false;
    }
  };
  const handleCheckAuthAndOpenModal = (auto) => {
        if (!isAuthenticated()) {
            // Usamos la API del hook para notificar
            api.warning({ 
                message: 'Autenticación Requerida', 
                description: 'Debes iniciar sesión para agregar vehículos al carrito.',
                placement: 'topLeft',
                duration: 3 
            });
            
            // Retrasamos la navegación
            setTimeout(() => {
                navigate('/login');
            }, 3000); 
            return; 
        }
        
        // Si está autenticado, llamamos a la función de la vista para abrir el modal
        // NOTA: Para hacer esto, debemos asegurarnos de que AutosView reciba la función de abrir el modal.
        // Ya que AutosPage no tiene acceso a abrirModalReserva, el check debe ir directamente en la vista.
    };
const handleAgregarCarrito = async (idVehiculo, fechas) => {
// if (!isAuthenticated()) {
//         message.warning('Debes iniciar sesión para agregar vehículos al carrito.');
//         navigate('/login'); // LO MANDA AL LOGIN
//         return false; 
//     }
    try {
      const idUsuario = getUserId(); 
      if (!idUsuario) {
        message.warning('Debes iniciar sesión.');
        return false; 
      }

      // Llamamos al API
      const respuesta = await dispatch(createCarritoThunk({
          IdUsuario: idUsuario, 
          IdVehiculo: idVehiculo, 
          FechaInicio: fechas[0], 
          FechaFin: fechas[1]
      })).unwrap();
      const idCarritoNuevo = respuesta.IdCarrito || respuesta.idCarrito || (respuesta.data && respuesta.data.IdCarrito);

      if (idCarritoNuevo) {
          console.log("💾 Guardando nuevo ID de Carrito:", idCarritoNuevo);
          setCarritoId(idCarritoNuevo); 
      } else {
          console.warn("⚠️ El backend no devolvió el IdCarrito. Revisa la consola 'RESPUESTA AL AGREGAR'");
      }
      message.success('Vehículo añadido exitosamente');
      return true;

    } catch (error) {
       message.error('Error al agregar');
       return false;
    }
};

  const handleEliminar = async (id) => {
    try {
      await dispatch(deleteVehiculoThunk(id)).unwrap();
      dispatch(fetchVehiculos());
      return true;
    } catch (error) {
      message.error('Error al eliminar el vehículo: ' + (error.message || 'Error desconocido'));
      return false;
    }
  };
  return (
    <>
    {contextHolder} 
    <AutosView
      autos={vehicles}
      loading={loading}
      error={error}
      onCrear={handleCrear}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
      onRefresh={cargarVehiculos}
      onAgregarCarrito={handleAgregarCarrito}
      setCarritoId
      onBuscar={handleBuscar}
      isAdmin={esAdministrador}
     checkAuth={isAuthenticated}
      navigate={navigate}
      api={api}
    />
    </>
  );
};

export default AutosPage;