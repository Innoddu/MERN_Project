import styles from "../styles/Note.module.css"
import stylesUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete} from "react-icons/md"

interface NoteProps {
    note: NoteModel,
    onNoteClicked:  (note: NoteModel) => void,
    onDeleteNoteCliked: (note: NoteModel) => void,
    className?: string,
}

const Note = ( { note, onNoteClicked, onDeleteNoteCliked, className } : NoteProps ) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let createUpdatedText: string;
    if (updatedAt > createdAt) {
        createUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card 
        className={ `${styles.noteCard} ${className}` }
        onClick={ () => onNoteClicked(note)}>
            <Card.Body className={styles.cardBody}>
                    <Card.Title className={stylesUtils.flexCenter}>
                        {title}
                        <MdDelete 
                            className="text-muted ms-auto"
                            onClick={ (e) => {
                                onDeleteNoteCliked(note);
                                e.stopPropagation();
                            }}
                        />
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
                        {text}
                    </Card.Text>
            </Card.Body>
                    <Card.Footer className="text-muted">
                        {createUpdatedText}
                    </Card.Footer>
        </Card>
    )
};

export default Note;