import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const applicationApi=createApi({
    reducerPath:'appApi',
    baseQuery:fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints:(builder)=>({
        getApi:builder.query({
            query:()=>"/name",
        }),
    })
})

export const {
    useGetApiQuery
}=applicationApi