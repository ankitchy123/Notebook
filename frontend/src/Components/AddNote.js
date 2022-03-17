import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/NoteContext';

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert('Added successfull', 'success');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Add title</label>
                <input type="text" className="form-control" name='title' id="title" value={note.title} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="desc">Add description</label>
                <textarea className="form-control" id="desc" rows="5" name='description' value={note.description} onChange={onChange} minLength={5} required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onChange} />
            </div>
            <button disabled={(note.title.length < 3 || note.description.length < 5 ? true : false)} type="submit" className="btn btn-primary" onClick={handleAdd}>Add note</button>
        </form>
    </div>;
};
