import { Products } from "@/Utils/type"
import axios from "axios"

export async function getAllUsers(){
    let url = `${process.env.NEXT_PUBLIC_API_URL}users/all`

    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },}

        return axios
            .get(
                url,
                axiosConfig,
            )
            .then((res) => {
                return res
            })
            .catch((e) => {
                throw new Error(e)
            })
}

export async function UpdateAdmin(id: string){
    let url = `${process.env.NEXT_PUBLIC_API_URL}users/updateAdmin/${id}`

    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    return axios
        .patch(
            url,
            axiosConfig,
        )
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw new Error(e)
        })

}

export async function createProduct(products: Products) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}newProducts`;

    const axiosConfig = {
        headers: {
            "content-type": "application/json;charset=utf-8",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    };
    return axios
        .post(
            url,
            {
                name: products.name,
                price: products.price,
                weight: products.weight,
                height: products.height,
                quantity: products.quantity
            },
            axiosConfig,
        )
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            throw Error(e)
        });
}