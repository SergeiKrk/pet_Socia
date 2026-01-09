// server.js  (ES-модули)
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
app.use(cors());
app.use(express.json());

const adapter = new JSONFile('db.json');

// 1. создаём экземпляр с дефолтными данными
const db = new Low(adapter, {
  posts:    [],
  users:    [],
  comments: [],
  albums:   [],
  photos:   [],
  todos:    []
});

// 2. читаем файл (если он уже есть и не пустой – подхватит)
await db.read();

// 3. на всякий случай мёржим, чтобы поля точно были
db.data = { ...db.data };

// 4. маленький хелпер CRUD
const crud = (name) => ({
  getAll: (_req, res) => res.json(db.data[name]),
  getById: (req, res) => {
    const item = db.data[name].find(i => i.id === +req.params.id);
    item ? res.json(item) : res.status(404).send('not found');
  },
  post: (req, res) => {
    console.log('[POST /users] body =', req.body);
    const lastId = Math.max(...db.data[name].map(i => i.id), 0);
    const created = { ...req.body, id: lastId + 1 };
    db.data[name].push(created);
    db.write().then(() => res.json(created));
  }
});

// 5. endpoints-заглушки
app.get('/posts',    crud('posts').getAll);
app.get('/users',    crud('users').getAll);
app.get('/comments', crud('comments').getAll);
app.get('/albums',   crud('albums').getAll);
app.get('/photos',   crud('photos').getAll);
app.get('/todos',    crud('todos').getAll);

// GET /users/:id/subscriptions — получить список ID на кого подписан пользователь
app.get('/users/:id/subscriptions', (req, res) => {
  const userId = +req.params.id;
  const user = db.data.users.find(u => u.id === userId);
  if (!user) return res.status(404).send('user not found');

  // Подписки храним внутри пользователя, например, как массив ID
  const subscriptions = user.subscriptions || [];
  res.json({ subscriptions });
});

// PUT /users/:id/subscriptions — обновить подписки
app.put('/users/:id/subscriptions', (req, res) => {
  const userId = +req.params.id;
  const user = db.data.users.find(u => u.id === userId);
  if (!user) return res.status(404).send('user not found');

  const { subscriptions } = req.body;
  if (!Array.isArray(subscriptions)) return res.status(400).send('subscriptions must be an array');

  user.subscriptions = subscriptions;
  db.write().then(() => res.sendStatus(204));
});

app.post('/users',   crud('users').post);   // CreateUserForm

// 6. стартуем
const PORT = 3001;
app.post('/posts', crud('posts').post);
app.listen(PORT, () => console.log(`lowdb-jsonplaceholder stub on http://localhost:${PORT}`));