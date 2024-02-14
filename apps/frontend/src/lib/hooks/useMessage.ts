import swal from 'sweetalert2';

export const useMessage = () => {
  const showErrorMessage = (message: string) => {
    swal.fire({
      icon: 'error',
      text: message,
    });
  };

  const showSuccessMessage = (message: string) => {
    swal.fire({
      icon: 'success',
      text: message,
    });
  };

  return {
    showErrorMessage,
    showSuccessMessage,
  };
};
