import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note'
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NoteApi from './network/note_api';
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [showNotesLoadingError, setshowNotesLoadingError] = useState(false);


  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);



  useEffect( () => {
    async function loadNotes() {
      try {
        setshowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setshowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
      loadNotes();

  }, []);

async function deleteNote(note: NoteModel) {
  try {
    await NoteApi.deleteNote(note._id);
    setNotes(notes.filter(existingNote => existingNote._id !== note._id))
  } catch (error) {
    console.error(error);
    alert(error);
  }
   
}

  const notesGrid = 
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
    {notes.map(note => (
      <Col key={note._id}>
      <Note 
        note={note}
        className={styles.note}
        onNoteClicked={setNoteToEdit}
        onDeleteNoteCliked={deleteNote}
        />
      </Col>
    ))}
    </Row>
  return (

    <Container className={styles.notesPage}>
      <Button 
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setshowAddNoteDialog(true)}>
        <FaPlus />
        Add New Note
      </Button>
     {notesLoading && <Spinner animation="border" variant="primary" />}
     {showNotesLoadingError && <p> Something went wrong. Please refresh the page.</p>}
     {!notesLoading && !showNotesLoadingError && 
     <>
     { notes.length > 0
        ? notesGrid
        : <p>You daon't have any notes yet</p>
     }
     </>
     }
      { showAddNoteDialog &&
        <AddEditNoteDialog
          onDismiss={() => setshowAddNoteDialog(false)}
          onNoteSaved={( newNote ) => {
          setNotes([...notes, newNote]);
          setshowAddNoteDialog(false);
        }}
        
        />
      }
      {noteToEdit &&
      <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={ ()=> setNoteToEdit(null)}
        onNoteSaved={(updateNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote));
          setNoteToEdit(null);
        }}
      />
      }
    </Container>
  );
}

export default App;
