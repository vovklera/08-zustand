import css from "./LayoutNotes.module.css"
import type {Metadata} from "next";

type Props ={
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

export const metadata: Metadata = {
    title: "All notes",
    description: "Your personal notes",
};

export default function FilterLayout({children, sidebar} : Props){
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    )
}