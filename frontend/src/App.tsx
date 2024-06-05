import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note'
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotePage.module.css"
import * as NoteApi from './network/note_api'
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);



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

  return (
    <Container>
      <Button onClick={() => setshowAddNoteDialog(true)}>
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
     {notes.map(note => (
       <Col key={note._id}>
        <Note note={note} className={styles.note}/>
       </Col>
     ))}
      </Row>
      { showAddNoteDialog &&
        <AddNoteDialog 
        onDismiss={() => setshowAddNoteDialog(false)}
        onNoteSaved={() => {}}
        />
      }
    </Container>
  );
}

export default App;
