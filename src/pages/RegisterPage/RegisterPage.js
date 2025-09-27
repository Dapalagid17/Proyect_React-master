import { useState } from 'react';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './RegisterPage.css';
import logo from '../../assets/Logo_ALAGID.png';

function RegisterPage() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Expresiones regulares
  const nameRegex = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/;
  const cedulaRegex = /^[0-9]{6,15}$/;
  const telefonoRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Filtrar en tiempo real: nombres/apellidos (solo letras y espacios)
    if (name === 'nombres' || name === 'apellidos') {
      newValue = value.replace(/[^a-zA-ZÁÉÍÓÚÑáéíóúñ\s]/g, '');
    }

    // Filtrar en tiempo real: cédula y teléfono (solo dígitos), limitar longitud
    if (name === 'cedula') {
      newValue = value.replace(/\D/g, '').slice(0, 15);
    }
    if (name === 'telefono') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    // limpiar error de ese campo al cambiarlo
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim: trabajar con valores "limpios"
    const data = {
      cedula: formData.cedula.trim(),
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      fechaNacimiento: formData.fechaNacimiento, // date no trim
      sexo: formData.sexo,
      telefono: formData.telefono.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    // Recolectar errores
    const newErrors = {};

    // Campos obligatorios (comprueba vacío después del trim)
    if (!data.nombres) newErrors.nombres = 'Por favor ingresa tus nombres.';
    else if (!nameRegex.test(data.nombres)) newErrors.nombres = 'El nombre solo debe contener letras y espacios.';

    if (!data.apellidos) newErrors.apellidos = 'Por favor ingresa tus apellidos.';
    else if (!nameRegex.test(data.apellidos)) newErrors.apellidos = 'El apellido solo debe contener letras y espacios.';

    if (!data.cedula) newErrors.cedula = 'Por favor ingresa la cédula.';
    else if (!cedulaRegex.test(data.cedula)) newErrors.cedula = 'La cédula debe contener solo números (6 a 15 dígitos).';

    if (!data.fechaNacimiento) newErrors.fechaNacimiento = 'Por favor ingresa la fecha de nacimiento.';

    if (!data.sexo) newErrors.sexo = 'Selecciona el sexo.';

    if (!data.telefono) newErrors.telefono = 'Por favor ingresa el teléfono.';
    else if (!telefonoRegex.test(data.telefono)) newErrors.telefono = 'El teléfono debe tener 10 dígitos.';

    if (!data.email) newErrors.email = 'Por favor ingresa el correo.';
    else if (!emailRegex.test(data.email)) newErrors.email = 'Escribe un correo válido.';

    if (!data.password) newErrors.password = 'Por favor ingresa la contraseña.';
    else if (!passwordRegex.test(data.password)) newErrors.password = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo.';

    if (data.password !== data.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';

    // Si hay errores, los seteamos y mostramos el primero
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      Swal.fire("Error en el formulario", newErrors[firstKey], "error");
      console.log('Errores de validación:', newErrors); // ayuda para depurar
      return;
    }

    // Si todo OK -> crear usuario
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Guardar datos en Firestore (valores ya trim)
      await setDoc(doc(db, 'usuarios', user.uid), {
        cedula: data.cedula,
        nombres: data.nombres,
        apellidos: data.apellidos,
        fechaNacimiento: data.fechaNacimiento,
        sexo: data.sexo,
        telefono: data.telefono,
        email: data.email,
        estado: 'pendiente'
      });

      Swal.fire("¡Registro exitoso!", "Usuario registrado correctamente.", "success").then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error('Error firebase:', error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire("Error", "Este correo ya está registrado.", "error");
      } else {
        Swal.fire("Error", "No se pudo registrar el usuario.", "error");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="form-card">
        <img src={logo} alt="Logo_ALAGID" className="logo mb-3 d-block mx-auto" style={{ width: '120px' }} />
        <h3 className="mb-4 text-center">Registro de Usuario</h3>
        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              placeholder="Tus nombres"
            />
            {errors.nombres && <div className="error-message">{errors.nombres}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Tus apellidos"
            />
            {errors.apellidos && <div className="error-message">{errors.apellidos}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Cédula</label>
            <input
              type="text"
              inputMode="numeric"
              className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Tu cédula"
            />
            {errors.cedula && <div className="error-message">{errors.cedula}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input type="date" className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`} name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
            {errors.fechaNacimiento && <div className="error-message">{errors.fechaNacimiento}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              inputMode="numeric"
              className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
            />
            {errors.telefono && <div className="error-message">{errors.telefono}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sexo" value="Masculino" checked={formData.sexo === 'Masculino'} onChange={handleChange} />
                <label className="form-check-label">Masculino</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sexo" value="Femenino" checked={formData.sexo === 'Femenino'} onChange={handleChange} />
                <label className="form-check-label">Femenino</label>
              </div>
            </div>
            {errors.sexo && <div className="error-message">{errors.sexo}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={formData.password} onChange={handleChange} placeholder="Escribe tu contraseña" />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Repetir Contraseña</label>
            <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirma tu contraseña" />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Registrar</button>
            <a href="/" className="btn btn-outline-secondary">Volver al inicio</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
