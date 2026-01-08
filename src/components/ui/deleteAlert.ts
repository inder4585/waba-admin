import swal from 'sweetalert';

type DeleteAlertOptions = {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  successTitle?: string;
  successText?: string;
  errorTitle?: string;
  errorText?: string;
  onConfirm: () => Promise<void>;
  onAfterSuccess?: () => void;
};

export const showDeleteConfirmation = async ({
  title = 'Delete?',
  text = 'Are you sure you want to delete this?',
  confirmText = 'OK',
  cancelText = 'Cancel',
  successTitle = 'Deleted!',
  successText = 'Item deleted successfully.',
  errorTitle = 'Error!',
  errorText = 'Failed to delete item.',
  onConfirm,
  onAfterSuccess,
}: DeleteAlertOptions) => {
  const result = await swal({
    title,
    text,
    icon: 'warning',
    buttons: {
      cancel: {
        text: cancelText,
        visible: true,
        closeModal: true,
      },
      confirm: {
        text: confirmText,
        visible: true,
        closeModal: false,
      },
    },
  });

  if (result) {
    try {
      await onConfirm();
      swal({
        title: successTitle,
        text: successText,
        icon: 'success',
      }).then(() => {
        if (onAfterSuccess) onAfterSuccess();
      });
    } catch (error) {
      swal({
        title: errorTitle,
        text: errorText,
        icon: 'error',
      });
    }
  }
};
