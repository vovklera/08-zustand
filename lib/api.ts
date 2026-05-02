import axios from "axios";
import type { Note, NoteFormData } from "@/types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    }
})

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (searchTodo: string, page: number = 1, perPage: number = 12, tag?: string): Promise<FetchNotesResponse>=>{
    const response = await api.get<FetchNotesResponse>("/notes",{
        params: {
            search: searchTodo,
            page,
            perPage,
            tag
        }
    })
    return response.data;
}

export const createNote = async (newNote: NoteFormData): Promise<Note> => {
    const response = await api.post<Note>("/notes", newNote);
    return response.data;
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${noteId}`);
    return response.data;
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${noteId}`);
    return response.data;
}