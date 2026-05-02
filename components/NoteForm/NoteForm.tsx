'use client'

import css from "./NoteForm.module.css";
import {useMutation} from "@tanstack/react-query";
import {createNote} from "@/lib/api";
import {useRouter} from "next/navigation";
import {NoteFormData} from "@/types/note";
import {useNoteDraftStore} from "@/lib/store/noteStore";
import {ChangeEvent} from "react";

export default function NoteForm() {
    const router = useRouter();

    const {draft, setDraft, clearDraft} = useNoteDraftStore();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        })
    }

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            clearDraft();
            router.push("/notes/filter/all");
        }
    })

    // const handleSubmit = (formData: FormData) => {
    //     const values = Object.fromEntries(formData) as NoteFormData;
    //     mutate(values);
    // };

    const handleSubmit = (formData: FormData) => {
        const values: NoteFormData = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tag: formData.get("tag") as string,
        };

        mutate(values);
    };

    const handleCancel = () => router.push('/notes/filter/all');

    return (
            <form action={handleSubmit} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        defaultValue={draft?.title}
                        onChange={handleChange}
                        className={css.input} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                        defaultValue={draft?.content}
                        onChange={handleChange}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <select
                        id="tag"
                        name="tag"
                        className={css.select}
                        defaultValue={draft?.tag}
                        onChange={handleChange} >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton} disabled={false}>
                        Create note
                    </button>
                    <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
    );
}