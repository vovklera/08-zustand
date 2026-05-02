import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import {fetchNoteById} from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type Props = {
    params: Promise<{id: string}>
}

export default async function NoteDetails(props: Props) {
    const {id} = await props.params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey:['note', id],
        queryFn: () => fetchNoteById(id)
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}