import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

import {fetchNotes} from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

type Props = {
    params: Promise<{slug: string[]}>;
}

export default async function NotesByCategory({ params }: Props) {
    const queryClient = new QueryClient();
    const { slug } = await params;

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, 12, slug[0]],
        queryFn: () => fetchNotes("", 1, 12, slug[0]),
    })

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient tag={slug[0]} />
            </HydrationBoundary>
        </div>
    )
}