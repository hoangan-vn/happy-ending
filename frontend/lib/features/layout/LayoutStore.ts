import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BaseState, BaseActions } from '../BaseStore';

export interface LayoutState extends BaseState {
  headerHeight: number;
  viewportHeight: number;
  viewportWidth: number;
  availableHeight: number; // viewportHeight - headerHeight
  isHeaderVisible: boolean;
  isHeaderSticky: boolean;
  scrollY: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface LayoutActions extends BaseActions {
  setHeaderHeight: (height: number) => void;
  setViewportSize: (width: number, height: number) => void;
  setHeaderVisible: (visible: boolean) => void;
  setHeaderSticky: (sticky: boolean) => void;
  setScrollY: (scrollY: number) => void;
  updateAvailableHeight: () => void;
  setDeviceType: (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => void;
  reset: () => void;
}

export type LayoutStore = LayoutState & LayoutActions;

const initialState: LayoutState = {
  headerHeight: 0,
  viewportHeight: 0,
  viewportWidth: 0,
  availableHeight: 0,
  isHeaderVisible: true,
  isHeaderSticky: false,
  scrollY: 0,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLoading: false,
  error: null
};

export const useLayoutStore = create<LayoutStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setHeaderHeight: (height: number) => {
        set({ headerHeight: height }, false, 'layout/setHeaderHeight');
        // Auto-update available height when header height changes
        const { viewportHeight } = get();
        const newAvailableHeight = Math.max(0, viewportHeight - height);
        set({ availableHeight: newAvailableHeight }, false, 'layout/updateAvailableHeight');
      },

      setViewportSize: (width: number, height: number) => {
        set({ viewportWidth: width, viewportHeight: height }, false, 'layout/setViewportSize');
        // Auto-update available height when viewport changes
        const { headerHeight } = get();
        const newAvailableHeight = Math.max(0, height - headerHeight);
        set({ availableHeight: newAvailableHeight }, false, 'layout/updateAvailableHeight');
      },

      setHeaderVisible: (visible: boolean) => {
        set({ isHeaderVisible: visible }, false, 'layout/setHeaderVisible');
        // Nếu header ẩn, availableHeight sẽ bằng viewportHeight
        if (!visible) {
          const { viewportHeight } = get();
          set({ availableHeight: viewportHeight }, false, 'layout/updateAvailableHeight');
        } else {
          // Nếu header hiện, tính toán lại availableHeight
          get().updateAvailableHeight();
        }
      },

      setHeaderSticky: (sticky: boolean) => {
        set({ isHeaderSticky: sticky }, false, 'layout/setHeaderSticky');
      },

      setScrollY: (scrollY: number) => {
        set({ scrollY }, false, 'layout/setScrollY');
      },

      updateAvailableHeight: () => {
        const { viewportHeight, headerHeight, isHeaderVisible } = get();
        // Nếu header ẩn, availableHeight = viewportHeight
        // Nếu header hiện, availableHeight = viewportHeight - headerHeight
        const newAvailableHeight = isHeaderVisible ? Math.max(0, viewportHeight - headerHeight) : viewportHeight;
        set({ availableHeight: newAvailableHeight }, false, 'layout/updateAvailableHeight');
      },

      setDeviceType: (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => {
        set({ isMobile, isTablet, isDesktop }, false, 'layout/setDeviceType');
      },

      setLoading: (isLoading: boolean) => set({ isLoading }, false, 'layout/setLoading'),
      setError: (error: string | null) => set({ error }, false, 'layout/setError'),
      reset: () => set(initialState, false, 'layout/reset')
    }),
    { name: 'LayoutStore' }
  )
);
