'use client'

import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { useParams } from 'next/navigation';

import {fetchNoteById} from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient(){
    // const {id} = useParams<{id: string}>();
    const params = useParams();
    const id = params.id as string;

    const router = useRouter();

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

    const handleBack = () => router.back();

    return (
        <div>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{note.createdAt}</p>
                    <p className={css.date}>{formattedDate}</p>
                    <button className={css.backBtn} onClick={handleBack}>
                        Go back
                    </button>
                </div>
            </div>
        </div>
    )
}