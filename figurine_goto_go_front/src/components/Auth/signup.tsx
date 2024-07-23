'use client'

import { registerUser } from '@/Services/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from "yup"
import { toast } from 'react-toastify'
import { registerProps } from '@/Utils/type'
import { schema } from '@/validator/validator'
import { ErrorMsg } from '../Error'

export const RegisterForm = () => {
    const { push } = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<registerProps>({ mode: "onChange", resolver: yupResolver(schema) })

    const onSubmit: SubmitHandler<registerProps> = (data) =>
        registerUser(data).then((res) => {
            if (res.status === 201) {
                toast.success("Welcome on Figurine Goto Go")
                push('/Login')
            }
        }).catch((e) => console.log(e))

    return (
        <div className="flex flex-col justify-center h-screen bg-inherit">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && <ErrorMsg message={errors.email.message} />}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                First name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                {...register('firstName')}
                            />
                        </div>
                        {errors.firstName && <ErrorMsg message={errors.firstName.message} />}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Last name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                {...register('lastName', { required: true })}
                            />
                        </div>
                        {errors.lastName && <ErrorMsg message={errors.lastName.message} />}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                {...register('password')}
                            />
                        </div>
                        {errors.password && <ErrorMsg message={errors.password.message} />}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            <div className='flex flex-col items-center'>
                <div className="flex flex-wrap items-center justify-center space-x-2">
                    <span className="h-px w-16 bg-gray-300"></span>
                    <span className=" font-normal">OR</span>
                    <span className="h-px w-16 bg-gray-300"></span>
                </div>
                <div className='w-64'>
                    <a
                        className="w-full flex justify-center bg-black bg-opacity-50 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        href="/Login"
                    >
                        Log to your account
                    </a>
                </div>
            </div>
        </div>
    )
}
