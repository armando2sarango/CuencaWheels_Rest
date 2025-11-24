import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import RegisterView from './RegisterView';
import { createUsuarioThunk } from '../../store/usuarios/thunks';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      // 🔍 DIAGNÓSTICO: Imprimir qué sale del formulario exactamente
      console.log("📝 Datos crudos del Formulario:", data);

      // ✅ MAPEO ROBUSTO
      const nuevoUsuario = {
        Nombre: data.nombre,
        Apellido: data.apellido,
        Email: data.email,
        Contrasena: data.password,
        Direccion: data.direccion,
        
        // Validamos que estos campos no sean undefined
        Pais: data.pais , 
        Edad: data.edad ? parseInt(data.edad) : 18,
        
        TipoIdentificacion: data.tipoIdentificacion || "Cédula",
        
        Identificacion: data.identificacion,
        
        Rol: "Cliente", 
       UsuarioCorreo: data.email, 
        Links: [] 
      };

      console.log('📦 JSON FINAL a enviar al Backend:', nuevoUsuario);

      // Enviamos al Backend
      await dispatch(createUsuarioThunk(nuevoUsuario)).unwrap();

      notification.success({
        message: '✅ Usuario creado correctamente',
        description: 'Redirigiendo al login...',
        placement: 'top',
        duration: 2.5,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2500);

    } catch (error) {
      console.error('❌ Error al registrar:', error);
      
      // Intentamos sacar el mensaje más claro posible
      let msg = 'No se pudo crear el usuario.';
      if (typeof error === 'string') msg = error;
      else if (error.message) msg = error.message;
      
      // Si el backend devuelve el error interno (InnerException)
      if (error.ExceptionMessage) msg = error.ExceptionMessage;

      notification.error({
        message: 'Error al registrar',
        description: msg,
        placement: 'top',
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  };

  return <RegisterView onRegister={handleRegister} loading={loading} />;
};

export default RegisterPage;