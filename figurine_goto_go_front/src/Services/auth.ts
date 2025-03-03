import { loginProps, registerProps } from '@/Utils/type'
import axios from 'axios'


export async function registerUser(registerProps: registerProps) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}auth/signup`

    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    return axios
        .post(
            url,
            {
                email: registerProps.email,
                password: registerProps.password,
                firstName: registerProps.firstName,
                lastName: registerProps.lastName,
            },
            axiosConfig
        )
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw new Error(e)
        })
}

export async function loginUser(loginProps: loginProps) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}auth/signin`



    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    return axios
        .post(
            url,
            {
                email: loginProps.email,
                password: loginProps.password,
            },
            axiosConfig
        )
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw new Error(e)
        })
}