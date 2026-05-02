"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
    children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default TanStackProvider;

// 'use client'
//
// import {
//     isServer,
//     QueryClient,
//     QueryClientProvider,
// } from '@tanstack/react-query'
//
// function makeQueryClient() {
//     return new QueryClient({
//         defaultOptions: {
//             queries: {
//                 staleTime: 60 * 1000,
//             },
//         },
//     })
// }
//
// let browserQueryClient: QueryClient | undefined = undefined
//
// function getQueryClient() {
//     if (isServer) {
//         return makeQueryClient()
//     } else {
//         if (!browserQueryClient) browserQueryClient = makeQueryClient()
//         return browserQueryClient
//     }
// }
//
// export default function TanStackProvider({ children }: { children: React.ReactNode }) {
//     const queryClient = getQueryClient()
//
//     return (
//         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     )
// }