import axios from "axios";

export async function getImage(filename: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}image/view/${filename}`;

    const axiosConfig = {
        headers: {
            "content-type": "application/json;charset=utf-8",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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
            throw Error(e)
        });
}
export async function uploadImage() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}image/upload`;

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
            axiosConfig,
        )
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            throw Error(e)
        });
}