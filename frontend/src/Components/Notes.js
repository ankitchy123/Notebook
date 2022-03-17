import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/notes/NoteContext';
import { AddNote } from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNotes();
        }
        else {
            navigate('/signup');
        }
    }, []);

    return <div className='container'>
        <AddNote showAlert={props.showAlert} />
        <h3>Your Notes</h3>
        {/* <div className="my-3 d-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}> */}
        <div className="my-3 d-grid" style={{ gridTemplateColumns: "1fr", gap: "1rem" }}>
            {notes.length === 0 ? 'No notes to display' : notes.map((note) => {
                return <NoteItem key={note._id} showAlert={props.showAlert} note={note} />
            })}
        </div>
    </div>;
}
export default Notes;