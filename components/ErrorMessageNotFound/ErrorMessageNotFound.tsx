import css from "./ErrorMessageNotFound.module.css";

export default function ErrorMessageNotFound(){
    return (
        <p className={css.text}>No notes found for your request.</p>
    );
}
