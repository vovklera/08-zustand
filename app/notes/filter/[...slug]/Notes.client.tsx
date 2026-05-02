'use client'

import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import Link from "next/link";

import css from './NotesPage.module.css'
import toast, {Toaster} from "react-hot-toast";

import {fetchNotes} from "@/lib/api"
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function NotesClient({tag}: {tag: string}) {
    const [page, setPage] = useState(1);
    const [searchTodo, setSearchTodo] = useState("");

    const category = tag === "all" ? undefined : tag;

    const handleSearch = useDebouncedCallback((e:string)=>{
        setSearchTodo(e);
        setPage(1);
    }, 300);

    const perPage = 12;

    const {data, isLoading, isSuccess, isError}= useQuery({
        queryKey: ['notes', searchTodo, page, perPage, category],
        queryFn: ()=>fetchNotes(searchTodo, page, perPage, category),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes ?? [];

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    useEffect(() => {
        if (isSuccess && data.notes.length === 0){
            toast.error("No notes found for your request.");
            return;
        }
    },[data, isSuccess])

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {<SearchBox onSearch={handleSearch} />}
                {isSuccess && data?.totalPages > 1 &&(
                    <Pagination
                        forcePage={page}
                        onPageChange={handlePageChange}
                        pageCount={data?.totalPages??0}
                    />
                )}
                <Link href='/notes/action/create' className={css.button}>
                    Create note +
                </Link>
            </header>
            {isLoading && <Loader/>}
            {isError && <ErrorMessage/>}
            <Toaster position={"top-center"}/>
            {notes.length > 0 && (<NoteList notes={notes}/>)}
        </div>
    )
}