import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  'https://ssiwjsmpejkbzkybdwrz.supabase.co',
  process.env.SUPABASE_ANON_KEY
);

// ------------------ GET ALL PRODUCTS ------------------
app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) return res.status(400).json(error);
  res.send(data);
});

// ------------------ GET PRODUCT BY ID ------------------
app.get('/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id);

  if (error) return res.status(400).json(error);
  res.send(data);
});

// ------------------ CREATE PRODUCT ------------------
app.post('/products', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "name e price são obrigatórios" });
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price }])
    .select();

  if (error) return res.status(400).json(error);
  res.send(data);
});

// ------------------ UPDATE PRODUCT ------------------
app.put('/products/:id', async (req, res) => {
  const { name, description, price } = req.body;

  const { data, error } = await supabase
    .from('products')
    .update({ name, description, price })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json(error);
  res.send(data);
});

// ------------------ DELETE PRODUCT ------------------
app.delete('/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json(error);
  res.send({ message: 'Product deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
