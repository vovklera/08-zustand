
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm"
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Create note",
    description: "Creating a note",
    openGraph: {
        title: `Create note`,
        description: `Creating a note`,
        url: process.env.OG_APP_URL || `/notes/action/create`,
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
};


export default function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {<NoteForm />}
            </div>
        </main>
    );
}