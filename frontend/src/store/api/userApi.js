// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/v1/' }),
    endpoints: (builder) => ({
        // getMe: builder.query({
        //     query: (name) => `user/me`,
        //     credentials: "include"
        // }),
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh_token/',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
        }),
        revokeRefreshTokens: builder.mutation({
            query: () => ({
                url: '/auth/revoke_refresh_tokens/',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
        }),
        getProfile: builder.mutation({
            query: () => ({
                url: '/user/profile/',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useRefreshTokenMutation, useRevokeRefreshTokensMutation, useGetProfileMutation } = userApi