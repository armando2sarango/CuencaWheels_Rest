import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CarritoView from './carritoView';
import { fetchCarritos, deleteCarritoThunk } from '../../store/carrito/thunks'; 
import { createReservaThunk } from '../../store/reservas/thunks';
import { getCarritoId, getUserId } from '../../services/auth'; 

const CarritoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items = [], loading = false, error = null } = useSelector((state) => state.carritos || {}); 
  const [total, setTotal] = useState(0);
  useEffect(() => {cargarCarrito(); }, []);

  useEffect(() => {
    calcularTotal();
  }, [items]);

  const cargarCarrito = () => {
    let idParaBuscar = getCarritoId();
    if (!idParaBuscar) {
        idParaBuscar = getUserId();
    }
    if (idParaBuscar) {
      dispatch(fetchCarritos(idParaBuscar));
    } else {
      console.warn("⛔ No se encontró ni ID Carrito ni ID Usuario.");
    }
  };

  const calcularTotal = () => {
    if (!items || !Array.isArray(items)) {
        setTotal(0);
        return;
    }
    const sumaTotal = items.reduce((acumulador, item) => {
      return acumulador + (item.Subtotal || 0);
    }, 0);

    setTotal(sumaTotal);
  };

  const handleEliminar = async (idItem) => {
    try {
      await dispatch(deleteCarritoThunk(idItem)).unwrap();
      message.success("Elemento eliminado");
      cargarCarrito();
    } catch (error) {
      message.error("Error al eliminar");
    }
  };
  const handleReservar = async () => {
    const idUsuario = getUserId();
    if (!idUsuario) {
        message.error("Debes iniciar sesión para reservar.");
        return;
    }

    try {
        message.loading({ content: 'Generando reservas...', key: 'reserva_proc' });

        // 1. Recorremos cada auto en el carrito
        for (const item of items) {
            const nuevaReserva = {
                IdUsuario: idUsuario,
                IdVehiculo: item.IdVehiculo,
                FechaInicio: item.FechaInicio,
                FechaFin: item.FechaFin,
                Total: item.Subtotal,
                Estado: "Pendiente",
                FechaReserva: new Date().toISOString(),
                UsuarioCorreo: "", 
                Links: []
            };

            // 2. Creamos la reserva
            await dispatch(createReservaThunk(nuevaReserva)).unwrap();

            // 3. Borramos del carrito
            await dispatch(deleteCarritoThunk(item.IdItem));
        }

        message.success({ content: '¡Reservas generadas con éxito!', key: 'reserva_proc' });
        
        // 4. Limpiamos y redirigimos
        cargarCarrito(); 
        setTimeout(() => navigate('/reservas'), 1500);

    } catch (error) {
        console.error(error);
        message.error({ content: 'Hubo un error al procesar las reservas.', key: 'reserva_proc' });
    }
  };
  return (
    <CarritoView 
      items={items} 
      loading={loading} 
      error={error} 
      totalGeneral={total} 
      onEliminar={handleEliminar} 
      onReservar={handleReservar}
    />
  );
};

export default CarritoPage;