import React, { useState, useEffect } from 'react';

import './global.css';
import './sidebar.css';
import './main.css';
import './app.css';

import api from './services/api';

import Notes from './components/notes';
import RadioButton from './components/RadioButton';

function App() {
  const [selectedValue, setSelectedValue] = useState('all');
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  async function getAllNotes() {
    const response = await api.get('/annotations');

    setAllNotes(response.data);
  }
  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);

    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }
  async function handleChangePriority(id) {
    const note = await api.post(`priorities/${id}`);
    if (note && selectedValue !== 'all') {
      loadNotes(selectedValue);
    } else if (note) {
      getAllNotes();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/annotations', {
      title,
      notes,
      priority: false,
    });
    setNotes('');
    setTitle('');

    if (selectedValue !== 'all') {
      getAllNotes();
    } else {
      setAllNotes([...allNotes, res.data]);
    }
    setSelectedValue('all');
  };

  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get(`priorities`, { params });

    if (response) {
      setAllNotes(response.data);
    }
  }
  function handleChange(e) {
    setSelectedValue(e.value);

    if (e.checked && e.value !== 'all') {
      loadNotes(e.value);
    } else {
      getAllNotes();
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit');
      btn.style.background = '#ffd3ca';
      if (title && notes) {
        btn.style.background = '#eb8f7a';
      }
    }
    enableSubmitButton();
  }, [title, notes]);

  return (
    <div id="app">
      <aside>
        <strong>Caderno de notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">titulo da anotaçao</label>
            <input
              required
              maxLength="35"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">anotaçoes</label>
            <textarea
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button id="btn_submit" type="submit">
            Salvar
          </button>
          <RadioButton
            selectedValue={selectedValue}
            handleChange={handleChange}
          />
        </form>
      </aside>
      <main>
        <ul>
          {allNotes.map((data) => (
            <Notes
              key={data._id}
              data={data}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
