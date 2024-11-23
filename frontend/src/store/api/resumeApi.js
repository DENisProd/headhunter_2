// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setUserData, setUserPortfolio} from "../slices/userSlice.js";
import {addOffer, setEduPortfolio, setOffers, setStudentResumes} from "../slices/resumeSlice.js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// Define a service using a base URL and expected endpoints
export const resumeApi = createApi({
    reducerPath: 'resumeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // getPortfolio: builder.mutation({
        //     query: () => ({
        //         url: '/user/portfolio',
        //         method: 'GET',
        //     }),
        //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //         //try {
        //         const result = await queryFulfilled;
        //         dispatch(setUserPortfolio(result.data));
        //     }
        // }),
        getStudents: builder.mutation({
            query: () => ({
                url: '/student/all',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                dispatch(setStudentResumes(result.data));
            }
        }),
        getStudent: builder.mutation({
            query: (id) => ({
                url: '/student/' + id,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
               // dispatch(setStudentResume(result.data));
            }
        }),
        createOffer: builder.mutation({
            query: (data) => ({
                url: '/student/offer',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled
                dispatch(addOffer(result.data))
            }
        }),
        getStudentOffers: builder.mutation({
            query: () => ({
                url: '/student/offers',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled
                dispatch(setOffers(result.data))
            }
        }),
        getEmployerOffers: builder.mutation({
            query: () => ({
                url: '/employer/offers',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled
                dispatch(setOffers(result.data))
            }
        }),
        getEduPortfolio: builder.mutation({
            query: (id) => ({
                url: '/user/prof/edu_portfolio/' + id,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                //try {
                const result = await queryFulfilled;
                let data = {}
                result.data.map(item => {
                    if (item?.typeName === "Управленческая деятельность") {
                        if (data["Управленческая деятельность"]) data["Управленческая деятельность"].push(item)
                        else data["Управленческая деятельность"] = [item]
                    } else {
                        if (data[item.category]) data[item.category].push(item)
                        else data[item.category] = [item]
                    }
                })

                dispatch(setEduPortfolio(data));
            }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetStudentsMutation,
    useCreateOfferMutation,
    useGetStudentOffersMutation,
    useGetEmployerOffersMutation,
    useGetEduPortfolioMutation,
} = resumeApi