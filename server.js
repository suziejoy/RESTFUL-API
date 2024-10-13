const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [];

// GET /items: Retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items: Add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id: Update an existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  items = items.map((item, index) => (index === id ? updatedItem : item));
  res.json(updatedItem);
});

// DELETE /items/:id: Delete an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  items = items.filter((_, index) => index !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/items', (req, res) => {
    const { search } = req.query;
    let filteredItems = items;
    if (search) {
      filteredItems = items.filter(item => item.name.includes(search));
    }
    res.json(filteredItems);
  });
  