import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";

type NotePreviewProps = {
    params: Promise<{id: string}>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
    const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ["noteDetails", id],
        queryFn: () => fetchNoteById(id),
    })

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotePreviewClient />
            </HydrationBoundary>
        </div>
    )
}