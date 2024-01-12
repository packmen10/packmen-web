import{configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import storeNavigationReducer from "./storeNavigation"
import itemsDataReducer from "./itemsData"
import invoiceSliceReducer from "./invoiceSlice"
import invoiceTable_itemsReducer from "./invoiceTable_Item"
import hrNvaigationReducer from "./hrNavigation"


import productionNavigationReducer from "./productionNavigation"
import addItemsIntoAnInvoiceReducer from "./addItemsIntoAnInvoice"
import issueNotNavigationReducer from "./issueNotNavigation"


export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        storeNavigationReducer,
        itemsDataReducer,
        invoiceSliceReducer,
        invoice_table_item:invoiceTable_itemsReducer,
        productionNavigation:productionNavigationReducer,
        itemsInvoice:addItemsIntoAnInvoiceReducer,
        issueNotNav:issueNotNavigationReducer,
        hrNavigation:hrNvaigationReducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
})