
import { cartType, countType, StoreCartType } from "@/Utils/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useStoreCount = create<countType>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 })),
            reset: () => set((state) => ({ cart: [], count: 0 })),
        }),
        { name: "count" }
    )
);

export const useStoreCart = create<StoreCartType>()((set) => ({
    cart: [],
    addCart: (product: cartType) =>
        set((state) => {
            const finded = state.cart.find(
                (element: cartType) => element?.product?.id == product?.product?.id
            );
            if (finded) {
                const newCart = state.cart.map((element: cartType) => {
                    if (element?.product?.id == product.product?.id) {
                        return {
                            ...element,
                            quantity: element.quantity + product.quantity,
                        };
                    }
                    return element;
                });
                return { cart: newCart };
            }
            return { cart: [...state.cart, product] };
        }),


    removeCart: (id: number) =>
        set((state) => ({
            cart: state.cart.filter(
                (element: cartType) => element?.product?.id !== id
            ),
        })),
}));
