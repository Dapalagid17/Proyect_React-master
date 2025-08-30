// imports...
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../../assets/Logo_ALAGID.png';
import userDefault from '../../assets/user.png'; 
import './DashboardPage.css';
import Swal from 'sweetalert2';

function DashboardPage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Determinar foto de usuario
  const userPhoto = user?.photoURL || userDefault;

  // Agregamos el console.log para verificar qué foto se está usando
  console.log(
    user?.photoURL
      ? `Usuario tiene foto: ${user.photoURL}`
      : `Usuario SIN foto, se usará: ${userDefault}`
  );

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, quedarme',
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        sessionStorage.setItem("logout", "true"); 
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: '¡Has cerrado sesión exitosamente!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/');
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cerrar sesión.',
        });
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" variant="dark" className="dashboard-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <img
              src={logo}
              alt="Logo_ALAGID"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Personas" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate('/clientes')}>
                  Clientes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/auxiliares')}>
                  Auxiliares
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => navigate('/servicios')}>Servicios</Nav.Link>
              <Nav.Link onClick={() => navigate('/cronograma')}>Cronograma</Nav.Link>
              <Nav.Link onClick={() => navigate('/opcion1')}>Opción 1</Nav.Link>
              <Nav.Link onClick={() => navigate('/opcion2')}>Opción 2</Nav.Link>
              <Nav.Item className="logout-container" onClick={handleLogout}>
                <Nav.Link className="logout-link d-flex align-items-center gap-2">
                  <FaSignOutAlt /> Cerrar Sesión
                  <img
                    src={userPhoto}
                    alt="Foto de usuario"
                    className="user-photo-nav"
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <div>
          <img src={logo} alt="Logo_ALAGID" className="main-logo" />
          <h1 className="welcome-title">Welcome to ALAGID System</h1>
          <p className="welcome-text">
            Manage your clients, services, and more efficiently!
          </p>

          <p className="welcome-text">
            <strong>Nombre:</strong> {user?.displayName || "Sin nombre"}
          </p>
          <p className="welcome-text">
            <strong>Email:</strong> {user?.email || "Sin correo"}
          </p>
          <img
            src={userPhoto}
            alt="Foto de usuario"
            className="main-logo"
            style={{ maxWidth: '100px', borderRadius: '50%' }}
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer mt-auto">
        <div className="container">
          <small>© 2025 ALAGID. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}

export default DashboardPage;
