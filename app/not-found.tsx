import css from "./NotFound.module.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    openGraph: {
        title: "Page Not Found",
        description: "Sorry, the page you are looking for does not exist.",
        url: "/notes/filter/all",
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

export default function NotFound (){
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}