const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  'https://ssiwjsmpejkbzkybdwrz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzaXdqc21wZWprYnpreWJkd3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4OTkyODYsImV4cCI6MjA3ODQ3NTI4Nn0.VTidNxv_f1Nwztn3fOblewoJOlYn6ddCbhkpg0aRbbc'
);

// GET all
app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) return res.status(400).json(error);

  console.log("Products:", data);
  res.send(data);
});

// GET by id
app.get('/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(400).json(error);

  res.send(data);
});

// POST
app.post('/products', async (req, res) => {
  const { error } = await supabase.from('products').insert(req.body);

  if (error) return res.status(400).json(error);

  res.send("created!!");
});

// PUT
app.put('/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .update(req.body)
    .eq('id', req.params.id);

  if (error) return res.status(400).json(error);

  res.send("updated!!");
});

// DELETE
app.delete('/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json(error);

  res.send("deleted!!");
});

app.get('/', (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
