import { useEffect } from 'react';
import Swal from 'sweetalert2';

function Spinner() {
    useEffect(() => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        return () => {
            Swal.close();
        };
    }, []);

    return null;
}

export default Spinner;

