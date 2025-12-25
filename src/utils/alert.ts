// src/utils/alerts.ts
import Swal from 'sweetalert2';

export const toast = (title: string, icon: 'success' | 'error' | 'info' = 'success') => {
    return Swal.fire({
        title: title,
        icon: icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
    });
};

export const errorAlert = (text: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'error!',
        text,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
    });
};

export const handleApiError = (err: any, defaultMessage: string = "something went wrong, please try again later") => {
    const serverMessage = err.response?.data?.message;
    if (serverMessage) {
        errorAlert(serverMessage);
    } else {
        errorAlert(defaultMessage);
    }
};