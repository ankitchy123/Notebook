import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/NoteContext';
import { AddNote } from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" });

    useEffect(() => {
        if (localStorage.getItem('auth-token') && localStorage.getItem('verified')) {
            getNotes();
        }
        else {
            navigate('/signup');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        props.showAlert('Note updated successfull', 'success')
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return <div className='container'>
        <AddNote showAlert={props.showAlert} />
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="container">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Add title</label>
                                <input type="text" className="form-control" name='etitle' id="etitle" onChange={onChange} value={note.etitle} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edesc">Add description</label>
                                <textarea className="form-control" id="edesc" rows="5" name='edescription' onChange={onChange} value={note.edescription} minLength={5} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name='etag' id="etag" onChange={onChange} value={note.etag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <h3>Your Notes</h3>
        <div className="my-3 d-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {notes.length === 0 ? 'No notes to display' : notes.map((note) => {
                return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
            })}
        </div>
    </div>;
}
export default Notes;