import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch } from '@mui/material';

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [editingIndex, setEditingIndex] = useState(null); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rows, setRows] = useState([
    { name: 'Example Task', description: 'This is an example task', completed: false },
    { name: 'Sample Task', description: 'This is a sample task', completed: true }
  ]);

  
  const handleShowModal = () => {
    setIsEditing(false); 
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setTitle(''); 
    setDescription('');
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
     
      const updatedRows = rows.map((item, idx) => 
        idx === editingIndex ? { name: title, description, completed: item.completed } : item
      );
      setRows(updatedRows);
    } else {
      
      const newTodo = { name: title, description, completed: false };
      setRows([...rows, newTodo]);
    }

    handleCloseModal();
  };

  
  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditingIndex(index); 
    setTitle(rows[index].name);
    setDescription(rows[index].description);
    setShowModal(true); 
  };

  // Handle delete button click
  const handleDeleteClick = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index); 
    setRows(updatedRows);
  };

  return (
    <div className='container mt-5 mb-5 table-wrapper'>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <h2>To Do List</h2>
        <button type="button" className="btn btn-primary w-25" onClick={handleShowModal}>
          Add ToDo <i className="ph ph-plus"></i>
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell align="right"><b>Description</b></TableCell>
              <TableCell align="right"><b>Status</b></TableCell>
              <TableCell align="right"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Switch checked={row.completed} onChange={() => {
                    const updatedRows = rows.map((item, idx) =>
                      idx === index ? { ...item, completed: !item.completed } : item
                    );
                    setRows(updatedRows);
                  }} />
                </TableCell>
                <TableCell align="right">
                  <div className='d-flex align-items-center gap-2'>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleEditClick(index)} 
                    >
                      <i className="ph ph-pencil-simple-line"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteClick(index)} 
                    >
                      <i className="ph ph-trash"></i>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding/editing ToDo */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit ToDo' : 'Add New ToDo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTodoTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTodoDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter todo description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Save ToDo'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TodoList;
