import Swal from 'sweetalert2';

export function showSuccess(msg) {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: msg,
    });
}

export function showError(msg) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
    });
}


// en cualquier componente solo haces:
// import { showSuccess } from '../utils/alerts';
// showSuccess("Todo salió bien!");
