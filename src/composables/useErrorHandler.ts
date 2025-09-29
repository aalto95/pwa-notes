import { ref } from 'vue';

export interface AppError {
  id: string;
  message: string;
  code?: string;
  timestamp: number;
  context?: string;
}

interface ToastInstance {
  add: (message: {
    severity?: 'error' | 'secondary' | 'success' | 'info' | 'warn' | 'contrast';
    summary?: string;
    detail?: string;
    life?: number;
  }) => void;
}

class ErrorHandler {
  private errors = ref<AppError[]>([]);
  private toast: ToastInstance | null = null;

  addError(error: Omit<AppError, 'id' | 'timestamp'>): void {
    const appError: AppError = {
      ...error,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    this.errors.value.push(appError);

    // Show toast notification if available
    if (this.toast) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 5000
      });
    } else {
      // Fallback to console and browser notification
      console.error('App Error:', appError);

      // Show browser notification if permission is granted
      if (Notification.permission === 'granted') {
        new Notification('Error', {
          body: error.message,
          icon: '/pwa-192x192.png'
        });
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('App Error:', appError);
    }
  }

  clearError(errorId: string): void {
    this.errors.value = this.errors.value.filter(
      (error) => error.id !== errorId
    );
  }

  clearAllErrors(): void {
    this.errors.value = [];
  }

  getErrors(): AppError[] {
    return this.errors.value;
  }

  hasErrors(): boolean {
    return this.errors.value.length > 0;
  }

  // Handle common error types
  handleNetworkError(error: Error, context?: string): void {
    this.addError({
      message: 'Network error. Please check your connection and try again.',
      code: 'NETWORK_ERROR',
      context
    });
  }

  handleStorageError(error: Error, context?: string): void {
    this.addError({
      message: 'Storage error. Your data may not be saved properly.',
      code: 'STORAGE_ERROR',
      context
    });
  }

  handleValidationError(error: Error, context?: string): void {
    this.addError({
      message: error.message || 'Invalid input. Please check your data.',
      code: 'VALIDATION_ERROR',
      context
    });
  }

  handleFileError(error: Error, context?: string): void {
    this.addError({
      message: 'File processing error. Please try a different file.',
      code: 'FILE_ERROR',
      context
    });
  }

  // Set toast instance (called from components)
  setToast(toastInstance: ToastInstance): void {
    this.toast = toastInstance;
  }

  // Global error handler for unhandled promises
  setupGlobalErrorHandling(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.addError({
        message: 'An unexpected error occurred. Please refresh the page.',
        code: 'UNHANDLED_PROMISE_REJECTION',
        context: 'Global'
      });

      // Prevent the default browser behavior
      event.preventDefault();
    });

    window.addEventListener('error', (event) => {
      this.addError({
        message: event.message || 'An unexpected error occurred.',
        code: 'JAVASCRIPT_ERROR',
        context: event.filename
      });
    });
  }
}

const errorHandler = new ErrorHandler();

export function useErrorHandler() {
  return {
    addError: errorHandler.addError.bind(errorHandler),
    clearError: errorHandler.clearError.bind(errorHandler),
    clearAllErrors: errorHandler.clearAllErrors.bind(errorHandler),
    getErrors: errorHandler.getErrors.bind(errorHandler),
    hasErrors: errorHandler.hasErrors.bind(errorHandler),
    handleNetworkError: errorHandler.handleNetworkError.bind(errorHandler),
    handleStorageError: errorHandler.handleStorageError.bind(errorHandler),
    handleValidationError:
      errorHandler.handleValidationError.bind(errorHandler),
    handleFileError: errorHandler.handleFileError.bind(errorHandler),
    setToast: errorHandler.setToast.bind(errorHandler),
    setupGlobalErrorHandling:
      errorHandler.setupGlobalErrorHandling.bind(errorHandler)
  };
}
