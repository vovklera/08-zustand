import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

import {fetchNotes} from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import type {Metadata} from "next";

type Props = {
    params: Promise<{slug: string[]}>;
}

export async function generateMetadata({params}: Props) : Promise<Metadata>{
    const { slug } = await params;

    const category = slug?.[0] ?? "all";

    return {
        title : `Notes: ${category}`,
        description: `Notes filtered by ${category}`,
        openGraph: {
            title: `Notes: ${category}`,
            description: `Notes filtered by ${category}`,
            url: `/notes/filter/${category}`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub',
                },
            ],
            type: 'article',
        }
    }
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