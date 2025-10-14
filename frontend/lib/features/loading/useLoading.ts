import { useCallback } from 'react';
import { useLoadingStore } from './LoadingStore';

// Hook để sử dụng loading state cho component
export const useComponentLoading = (key: string) => {
  const { componentLoading, setComponentLoading } = useLoadingStore();

  const isLoading = componentLoading[key] || false;
  const setLoading = useCallback(
    (loading: boolean) => {
      setComponentLoading(key, loading);
    },
    [key, setComponentLoading]
  );

  return { isLoading, setLoading };
};

// Hook để sử dụng loading state cho data
export const useDataLoading = (key: string) => {
  const { dataLoading, setDataLoading } = useLoadingStore();

  const isLoading = dataLoading[key] || false;
  const setLoading = useCallback(
    (loading: boolean) => {
      setDataLoading(key, loading);
    },
    [key, setDataLoading]
  );

  return { isLoading, setLoading };
};

// Hook để sử dụng lazy loading
export const useLazyLoading = (key: string) => {
  const { lazyLoading, setLazyLoading } = useLoadingStore();

  const isLoading = lazyLoading[key] || false;
  const setLoading = useCallback(
    (loading: boolean) => {
      setLazyLoading(key, loading);
    },
    [key, setLazyLoading]
  );

  return { isLoading, setLoading };
};

// Hook để sử dụng skeleton
export const useSkeleton = (key: string) => {
  const { showSkeleton, setShowSkeleton } = useLoadingStore();

  const show = showSkeleton[key] || false;
  const setShow = useCallback(
    (show: boolean) => {
      setShowSkeleton(key, show);
    },
    [key, setShowSkeleton]
  );

  return { show, setShow };
};

// Hook để sử dụng progress
export const useProgress = (key: string) => {
  const { progress, setProgress, incrementProgress } = useLoadingStore();

  const currentProgress = progress[key] || 0;
  const setCurrentProgress = useCallback(
    (progress: number) => {
      setProgress(key, progress);
    },
    [key, setProgress]
  );

  const increment = useCallback(
    (increment: number) => {
      incrementProgress(key, increment);
    },
    [key, incrementProgress]
  );

  return { progress: currentProgress, setProgress: setCurrentProgress, increment };
};

// Hook để sử dụng loading message
export const useLoadingMessage = (key: string) => {
  const { loadingMessages, setLoadingMessage, clearLoadingMessage } = useLoadingStore();

  const message = loadingMessages[key] || '';
  const setMessage = useCallback(
    (message: string) => {
      setLoadingMessage(key, message);
    },
    [key, setLoadingMessage]
  );

  const clear = useCallback(() => {
    clearLoadingMessage(key);
  }, [key, clearLoadingMessage]);

  return { message, setMessage, clear };
};

// Hook để sử dụng loading error
export const useLoadingError = (key: string) => {
  const { loadingErrors, setLoadingError, clearLoadingError } = useLoadingStore();

  const error = loadingErrors[key] || null;
  const setError = useCallback(
    (error: string | null) => {
      setLoadingError(key, error);
    },
    [key, setLoadingError]
  );

  const clear = useCallback(() => {
    clearLoadingError(key);
  }, [key, clearLoadingError]);

  return { error, setError, clear };
};

// Hook tổng hợp cho một loading key
export const useLoading = (key: string) => {
  const componentLoading = useComponentLoading(key);
  const dataLoading = useDataLoading(key);
  const lazyLoading = useLazyLoading(key);
  const skeleton = useSkeleton(key);
  const progress = useProgress(key);
  const message = useLoadingMessage(key);
  const error = useLoadingError(key);

  const isLoading = componentLoading.isLoading || dataLoading.isLoading || lazyLoading.isLoading;

  return {
    // Loading states
    isLoading,
    componentLoading,
    dataLoading,
    lazyLoading,
    skeleton,

    // Progress
    progress,

    // Messages & Errors
    message,
    error,

    // Utility
    setLoading: (loading: boolean) => {
      componentLoading.setLoading(loading);
      dataLoading.setLoading(loading);
      lazyLoading.setLoading(loading);
    }
  };
};

// Hook để kiểm tra global loading states
export const useGlobalLoading = () => {
  const { isAppLoading, isPageLoading, isInitializing, isAnyLoading } = useLoadingStore();

  return {
    isAppLoading,
    isPageLoading,
    isInitializing,
    isAnyLoading: isAnyLoading()
  };
};
