import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note'
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NoteApi from './network/note_api';
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);



  useEffect( () => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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


  return (
    <Container>
      <Button 
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setshowAddNoteDialog(true)}>
        <FaPlus />
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
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
