import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsuariosView from './UsuariosView';
import { message } from 'antd';

import { 
  fetchUsuarios, 
  createUsuarioThunk, 
  updateUsuarioThunk, 
  deleteUsuarioThunk 
} from '../../store/usuarios/thunks';

const UsuariosPage = () => {
  const dispatch = useDispatch();
  const { usuarios, loading, error } = useSelector(state => state.usuarios);

  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  // Función auxiliar para mapear del Formulario -> Backend DTO
  const mapearUsuarioDTO = (values, idUsuario = 0) => {
    return {
      IdUsuario: idUsuario, // 0 si es crear
      Nombre: values.Nombre,
      Apellido: values.Apellido,
      Email: values.Email,
      Contrasena: values.Contrasena, 
      Direccion: values.Direccion,
      Edad: values.Edad ? parseInt(values.Edad) : null,
      Pais: values.Pais,
      TipoIdentificacion: values.TipoIdentificacion,
      Identificacion: values.Identificacion,
      UsuarioCorreo: values.UsuarioCorreo,
      Rol: values.Rol,
      UsuarioCorreo: values.UsuarioCorreo || values.Email,
    };
  };

  const handleCrear = async (formValues) => {
    try {
      const nuevoUsuario = mapearUsuarioDTO(formValues, 0);
      console.log("Creando usuario:", nuevoUsuario); // Debug
      
      await dispatch(createUsuarioThunk(nuevoUsuario)).unwrap();
      
      message.success("Usuario creado correctamente");
      dispatch(fetchUsuarios());
      return true;
    } catch (err) {
      console.error(err);
      const msg = err.message || err || "Error al crear usuario";
      message.error(msg);
      return false;
    }
  };

  const handleEditar = async (formValues) => {
    try {
      // OJO: formValues aquí trae los datos del formulario del modal
      // Necesitamos asegurarnos de pasar el ID que viene aparte o dentro
      const usuarioEditado = mapearUsuarioDTO(formValues, formValues.IdUsuario);

      await dispatch(updateUsuarioThunk({
        id: usuarioEditado.IdUsuario,
        body: usuarioEditado
      })).unwrap();

      message.success("Usuario actualizado correctamente");
      dispatch(fetchUsuarios());
      return true;
    } catch (err) {
      console.error(err);
      message.error("Error al actualizar usuario");
      return false;
    }
  };

  const handleEliminar = async (id) => {
    try {
      const result = await dispatch(deleteUsuarioThunk(id)).unwrap();
      if (result.success) {
        message.success("Usuario eliminado correctamente");
      } else {
        message.error("El servidor no pudo eliminar el usuario");
      }
      // Actualizamos la lista (aunque el slice ya lo hace localmente)
      dispatch(fetchUsuarios());
      return true;
    } catch (err) {
      console.error(err);
      message.error("Error al eliminar usuario");
      return false;
    }
  };

  return (
    <UsuariosView
      usuarios={usuarios}
      loading={loading}
      error={error}
      onCrear={handleCrear}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
    />
  );
};

export default UsuariosPage;