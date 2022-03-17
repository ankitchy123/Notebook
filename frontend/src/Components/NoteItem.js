import React, { useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';

const NoteItem = (props) => {
    const { note } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const del = (e) => {
        e.preventDefault();
        deleteNote(note._id);
        props.showAlert('Deleted successfull', 'success');
    }
    return <div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text text-secondary">{note.description}</p>
                <a className="btn btn-primary mx-2 deleteBtn" onClick={del}>Delete <i className="far fa-trash-alt"></i></a>
            </div>
        </div>
    </div>;
};

export default NoteItem;
