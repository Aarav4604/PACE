import { StateCreator, createStore } from 'zustand/vanilla';
import { create } from 'zustand';

interface Position {
  id: number;
  name: string;
  weight: number;
}

interface SlateState {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  updateWeight: (id: number, weight: number) => void;
}

export const useSlateStore = create<SlateState>((set: (fn: (state: SlateState) => Partial<SlateState> | SlateState) => void) => ({
  positions: [
    { id: 1, name: 'AAPL', weight: 30 },
    { id: 2, name: 'TSLA', weight: 20 },
    { id: 3, name: 'NVDA', weight: 25 },
    { id: 4, name: 'AMZN', weight: 25 },
  ],
  setPositions: (positions: Position[]) => set(() => ({ positions })),
  updateWeight: (id: number, weight: number) => set((state: SlateState) => ({
    positions: state.positions.map((p: Position) =>
      p.id === id ? { ...p, weight } : p
    ),
  })),
})); 