// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setUserData, setUserPortfolio} from "../slices/userSlice.js";
import {BASE_URL} from "../../components/ui/ImageUploader/ImageUploader.jsx";
import {addOffer, setOffers, setStudentResumes} from "../slices/resumeSlice.js";

// Define a service using a base URL and expected endpoints
export const resumeApi = createApi({
    reducerPath: 'resumeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
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
        getOffers: builder.mutation({
            query: () => ({
                url: '/student/offer/all',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled
                dispatch(setOffers(result.data))
            }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetStudentsMutation,
    useCreateOfferMutation,
    useGetOffersMutation
} = resumeApi