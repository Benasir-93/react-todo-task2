import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([{ name: 'task1', description: 'some data', status: 'completed' }]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  function addData() {
    return data.map((item, index) => (
      <div className='container' key={index}>
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <p className="card-text"><b>Task name:</b> {item.name}</p>
            <p className="card-text"><b>Description: </b>{item.description}</p>

            <p>
              <b>Status:</b> <span className={`status ${item.status === 'completed' ? 'completed' : ''}`}
                onClick={() => toggleStatus(index)}>
                {item.status}
              </span>
            </p>

            <span>
              <button type="button" className="btn btn-warning m-3" onClick={() => handleEdit(index)}>Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
            </span>
          </div>
        </div>
      </div>
    ));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (editingIndex !== -1) {
      // Editing existing item
      const newData = [...data];
      newData[editingIndex] = { name, description, status: newData[editingIndex].status };
      setData(newData);
      setEditingIndex(-1);
    } else {
      // Adding new item
      const newData = [...data, { name, description, status: 'not completed' }];
      setData(newData);
    }
    setName('');
    setDescription('');
  }

  function handleEdit(index) {
    const selectedItem = data[index];
    setName(selectedItem.name);
    setDescription(selectedItem.description);
    setEditingIndex(index);
  }

  function handleDelete(index) {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  }

  function toggleStatus(index) {
    const newData = [...data];
    newData[index].status = newData[index].status === 'completed' ? 'not completed' : 'completed';
    setData(newData);
  }

  return (
    <>
      <div className="container-fluid">
        <form>
          <div className="form-row">
            <div className="form-group col-md-5">
              <input type="text" className="form-control" id="name" placeholder="todo name" value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-5">
              <input type="text" className="form-control" id="description" placeholder="todo description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <button className="btn btn-success" id="addData" onClick={handleFormSubmit}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
      <div id="todolist">{addData()}</div>
    </>
  );
}

export default App;
