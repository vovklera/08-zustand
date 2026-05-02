import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import {fetchNoteById} from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import {Metadata} from "next";

type Props = {
    params: Promise<{id: string}>
}

export async function generateMetadata({params}: Props) : Promise<Metadata>{
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title : `Note: ${note.title}`,
        description: note.content.slice(0, 30),
    }
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