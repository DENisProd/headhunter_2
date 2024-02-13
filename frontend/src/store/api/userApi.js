// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setUserData, setUserPortfolio} from "../slices/userSlice.js";
import {BASE_URL} from "../../components/ui/ImageUploader/ImageUploader.jsx";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
            return headers;
        }
    }),
    endpoints: (builder) => ({
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
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh_token/',
                method: 'POST',
            }),
        }),
        revokeRefreshTokens: builder.mutation({
            query: () => ({
                url: '/auth/revoke_refresh_tokens/',
                method: 'POST',
            }),
        }),
        getProfile: builder.mutation({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUserData(result.data));
                } catch (error) {
                    if (error.status === 401) {
                        // Обработка ошибки 401 (Unauthorized)
                        // Здесь вы можете выполнить переадресацию на страницу /login
                        // Например, с помощью библиотеки react-router-dom или другой библиотеки маршрутизации
                        // Пример с react-router-dom:
                        // history.push('/login');
                        window.location.href = "/login"
                    } else {

                    }
                    // queryFailed(error); // Помечаем запрос как проваленный, чтобы обработчик ошибок на верхнем уровне сработал
                }
            }
        }),
        addPortfolioUser: builder.mutation({
            query: (data) => ({
                url: '/user/portfolio',
                method: 'POST',
                body: JSON.stringify(data),
            }),
        }),
        getPortfolio: builder.mutation({
            query: () => ({
                url: '/user/portfolio',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                //try {
                    const result = await queryFulfilled;
                    dispatch(setUserPortfolio(result.data));
            }
        }),
        toggleIsWork: builder.mutation({
            query: () => ({
                url: '/student/work',
                method: 'GET',
            })
        }),
        addEducation: builder.mutation({
            query: (data) => ({
                url: '/student/education',
                method: 'POST',
                body: JSON.stringify(data),
            })
        }),
        editStudentProfile: builder.mutation({
            query: (data) => ({
                url: '/student/',
                method: 'PATCH',
                body: JSON.stringify(data),
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    const result = await queryFulfilled;
                    console.log(result)
            }
        }),
        addMoney: builder.mutation({
            query: (data) => ({
                url: '/employer/balance',
                method: 'POST',
                body: JSON.stringify(data),
            }),
        }),

    }),
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useRefreshTokenMutation,
    useRevokeRefreshTokensMutation,
    useGetProfileMutation,
    useAddPortfolioUserMutation,
    useGetPortfolioMutation,
    useAddEducationMutation,
    useAddMoneyMutation,
    useEditStudentProfileMutation,
    useToggleIsWorkMutation,
} = userApi