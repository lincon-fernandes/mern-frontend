import React, { useState } from 'react';
import { AiTwotoneDelete, AiOutlineExclamationCircle } from 'react-icons/ai';

import './styles.css';
import './styles-priorities.css';

import api from '../../services/api';

function Note({ data, handleDelete, handleChangePriority }) {
  const [changeNotes, setChangeNotes] = useState('');

  function handleEdit(e, priority) {
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';

    if (priority) {
      e.style.boxShadow = '0 0 5px white';
    } else {
      e.style.boxShadow = '0 0 5px gray';
    }
  }

  async function handleSave(e, note) {
    e.style.cursor = 'pointer';
    e.style.boxShadow = 'none';
    if (changeNotes && changeNotes !== note) {
      await api.post(`/content/${data._id}`, {
        notes: changeNotes,
      });
    }
  }

  return (
    <>
      <li
        className={data.priority ? 'notepad-infos-priority' : 'notepad-infos'}
      >
        <div>
          <strong>{data.title}</strong>
          <div>
            <AiTwotoneDelete onClick={() => handleDelete(data._id)} size="24" />
          </div>
        </div>
        <textarea
          defaultValue={data.notes}
          onClick={(e) => handleEdit(e.target, data.priority)}
          onChange={(e) => setChangeNotes(e.target.value)}
          onBlur={(e) => handleSave(e.target, data.notes)}
        />

        <span>
          <AiOutlineExclamationCircle
            onClick={() => handleChangePriority(data._id)}
            size="24"
          />
        </span>
      </li>
    </>
  );
}
export default Note;
