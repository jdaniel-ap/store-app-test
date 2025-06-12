import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  category?: {
    id: number;
    name: string;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Si ya existe, incrementar cantidad
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              ...state,
              items: updatedItems,
              totalItems: updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              ),
              totalPrice: updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ),
            };
          });
        } else {
          // Si no existe, agregar nuevo item
          const newItem: CartItem = { ...product, quantity: 1 };
          set((state) => {
            const updatedItems = [...state.items, newItem];
            return {
              ...state,
              items: updatedItems,
              totalItems: updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              ),
              totalPrice: updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ),
            };
          });
        }
      },

      removeItem: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.id !== productId
          );
          return {
            ...state,
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          return {
            ...state,
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }));
      },

      setCartOpen: (isOpen) => {
        set((state) => ({ ...state, isOpen }));
      },
    }),
    {
      name: 'cart-storage', // nombre para localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }), // solo persistir items y totales
    }
  )
);
