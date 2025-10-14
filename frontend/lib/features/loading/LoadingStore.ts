import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface LoadingState {
  // Global loading states
  isAppLoading: boolean;
  isPageLoading: boolean;
  isInitializing: boolean;

  // Component loading states
  componentLoading: Record<string, boolean>;

  // Data loading states
  dataLoading: Record<string, boolean>;

  // Lazy loading states
  lazyLoading: Record<string, boolean>;

  // Skeleton states
  showSkeleton: Record<string, boolean>;

  // Progress tracking
  progress: Record<string, number>; // 0-100

  // Loading messages
  loadingMessages: Record<string, string>;

  // Error states
  loadingErrors: Record<string, string | null>;
}

export interface LoadingActions {
  // Global loading
  setAppLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  setInitializing: (initializing: boolean) => void;

  // Component loading
  setComponentLoading: (key: string, loading: boolean) => void;
  setMultipleComponentLoading: (keys: string[], loading: boolean) => void;

  // Data loading
  setDataLoading: (key: string, loading: boolean) => void;
  setMultipleDataLoading: (keys: string[], loading: boolean) => void;

  // Lazy loading
  setLazyLoading: (key: string, loading: boolean) => void;
  setMultipleLazyLoading: (keys: string[], loading: boolean) => void;

  // Skeleton
  setShowSkeleton: (key: string, show: boolean) => void;
  setMultipleShowSkeleton: (keys: string[], show: boolean) => void;

  // Progress
  setProgress: (key: string, progress: number) => void;
  incrementProgress: (key: string, increment: number) => void;

  // Messages
  setLoadingMessage: (key: string, message: string) => void;
  clearLoadingMessage: (key: string) => void;

  // Errors
  setLoadingError: (key: string, error: string | null) => void;
  clearLoadingError: (key: string) => void;

  // Utility methods
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
  clearAllLoading: () => void;
  reset: () => void;
}

export type LoadingStore = LoadingState & LoadingActions;

const initialState: LoadingState = {
  // Global states
  isAppLoading: false,
  isPageLoading: false,
  isInitializing: true,

  // Component states
  componentLoading: {},
  dataLoading: {},
  lazyLoading: {},
  showSkeleton: {},

  // Progress
  progress: {},

  // Messages
  loadingMessages: {},

  // Errors
  loadingErrors: {}
};

export const useLoadingStore = create<LoadingStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Global loading
      setAppLoading: (loading: boolean) => set({ isAppLoading: loading }, false, 'loading/setAppLoading'),

      setPageLoading: (loading: boolean) => set({ isPageLoading: loading }, false, 'loading/setPageLoading'),

      setInitializing: (initializing: boolean) =>
        set({ isInitializing: initializing }, false, 'loading/setInitializing'),

      // Component loading
      setComponentLoading: (key: string, loading: boolean) =>
        set(
          (state) => ({
            componentLoading: {
              ...state.componentLoading,
              [key]: loading
            }
          }),
          false,
          `loading/setComponentLoading/${key}`
        ),

      setMultipleComponentLoading: (keys: string[], loading: boolean) =>
        set(
          (state) => ({
            componentLoading: {
              ...state.componentLoading,
              ...Object.fromEntries(keys.map((key) => [key, loading]))
            }
          }),
          false,
          'loading/setMultipleComponentLoading'
        ),

      // Data loading
      setDataLoading: (key: string, loading: boolean) =>
        set(
          (state) => ({
            dataLoading: {
              ...state.dataLoading,
              [key]: loading
            }
          }),
          false,
          `loading/setDataLoading/${key}`
        ),

      setMultipleDataLoading: (keys: string[], loading: boolean) =>
        set(
          (state) => ({
            dataLoading: {
              ...state.dataLoading,
              ...Object.fromEntries(keys.map((key) => [key, loading]))
            }
          }),
          false,
          'loading/setMultipleDataLoading'
        ),

      // Lazy loading
      setLazyLoading: (key: string, loading: boolean) =>
        set(
          (state) => ({
            lazyLoading: {
              ...state.lazyLoading,
              [key]: loading
            }
          }),
          false,
          `loading/setLazyLoading/${key}`
        ),

      setMultipleLazyLoading: (keys: string[], loading: boolean) =>
        set(
          (state) => ({
            lazyLoading: {
              ...state.lazyLoading,
              ...Object.fromEntries(keys.map((key) => [key, loading]))
            }
          }),
          false,
          'loading/setMultipleLazyLoading'
        ),

      // Skeleton
      setShowSkeleton: (key: string, show: boolean) =>
        set(
          (state) => ({
            showSkeleton: {
              ...state.showSkeleton,
              [key]: show
            }
          }),
          false,
          `loading/setShowSkeleton/${key}`
        ),

      setMultipleShowSkeleton: (keys: string[], show: boolean) =>
        set(
          (state) => ({
            showSkeleton: {
              ...state.showSkeleton,
              ...Object.fromEntries(keys.map((key) => [key, show]))
            }
          }),
          false,
          'loading/setMultipleShowSkeleton'
        ),

      // Progress
      setProgress: (key: string, progress: number) =>
        set(
          (state) => ({
            progress: {
              ...state.progress,
              [key]: Math.max(0, Math.min(100, progress))
            }
          }),
          false,
          `loading/setProgress/${key}`
        ),

      incrementProgress: (key: string, increment: number) =>
        set(
          (state) => ({
            progress: {
              ...state.progress,
              [key]: Math.max(0, Math.min(100, (state.progress[key] || 0) + increment))
            }
          }),
          false,
          `loading/incrementProgress/${key}`
        ),

      // Messages
      setLoadingMessage: (key: string, message: string) =>
        set(
          (state) => ({
            loadingMessages: {
              ...state.loadingMessages,
              [key]: message
            }
          }),
          false,
          `loading/setLoadingMessage/${key}`
        ),

      clearLoadingMessage: (key: string) =>
        set(
          (state) => {
            const newMessages = { ...state.loadingMessages };
            delete newMessages[key];
            return { loadingMessages: newMessages };
          },
          false,
          `loading/clearLoadingMessage/${key}`
        ),

      // Errors
      setLoadingError: (key: string, error: string | null) =>
        set(
          (state) => ({
            loadingErrors: {
              ...state.loadingErrors,
              [key]: error
            }
          }),
          false,
          `loading/setLoadingError/${key}`
        ),

      clearLoadingError: (key: string) =>
        set(
          (state) => {
            const newErrors = { ...state.loadingErrors };
            delete newErrors[key];
            return { loadingErrors: newErrors };
          },
          false,
          `loading/clearLoadingError/${key}`
        ),

      // Utility methods
      isLoading: (key: string) => {
        const state = get();
        return state.componentLoading[key] || state.dataLoading[key] || state.lazyLoading[key] || false;
      },

      isAnyLoading: () => {
        const state = get();
        return (
          state.isAppLoading ||
          state.isPageLoading ||
          Object.values(state.componentLoading).some(Boolean) ||
          Object.values(state.dataLoading).some(Boolean) ||
          Object.values(state.lazyLoading).some(Boolean)
        );
      },

      clearAllLoading: () =>
        set(
          {
            componentLoading: {},
            dataLoading: {},
            lazyLoading: {},
            showSkeleton: {},
            progress: {},
            loadingMessages: {},
            loadingErrors: {}
          },
          false,
          'loading/clearAllLoading'
        ),

      reset: () => set(initialState, false, 'loading/reset')
    }),
    { name: 'LoadingStore' }
  )
);
