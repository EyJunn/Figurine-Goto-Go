export type registerProps ={
    email: string
    password: string
    firstName: string
    lastName: string
}

export type loginProps ={
    email: string
    password: string
}

export type Products = {
    id: number
    name: string
    price: number
    quantity: number
    category: string
    image: string
    weight: number
    height: number
}

export type cartType ={
    product: Products
    quantity: number
}

export type countType = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export type StoreCartType = {
    cart: cartType[];
    addCart: (product: cartType) => void;
    removeCart: (id: number) => void;
}