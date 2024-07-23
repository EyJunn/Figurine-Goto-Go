import { Products } from "@/Utils/type";
import axios from "axios";
import { toast } from "react-toastify";

export async function getAllProducts() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}products/allProducts`;
    let sub = window.localStorage.getItem("jwt")


    const axiosConfig = {
        headers: {
            "content-type": "application/json;charset=utf-8",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${sub}`
        },
    };
    return axios
        .get(
            url,
            axiosConfig,
        )
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            toast.error(e.response.data.message, {
                position: "top-right",
            });
            return e;
        });
}






