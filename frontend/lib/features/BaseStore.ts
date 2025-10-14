export interface BaseState {
  isLoading: boolean;
  error: string | null;
}

export interface BaseActions {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type BaseStore = BaseState & BaseActions;
