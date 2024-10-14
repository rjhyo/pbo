const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Simulasi database dengan array
let books = [];

// Halaman utama (Daftar Buku)
app.get('/', (req, res) => {
    res.render('books', { books });
});

// Menambah buku
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    books.push({ title, author, year });
    res.redirect('/');
});

// Halaman edit buku
app.get('/edit/:index', (req, res) => {
    const book = books[req.params.index];
    res.render('edit', { book, index: req.params.index });
});

// Memperbarui buku
app.post('/edit/:index', (req, res) => {
    const { title, author, year } = req.body;
    books[req.params.index] = { title, author, year };
    res.redirect('/');
});

// Menghapus buku
app.post('/delete/:index', (req, res) => {
    books.splice(req.params.index, 1);
    res.redirect('/');
});

// Halaman untuk menambahkan buku
app.get('/add', (req, res) => {
    res.render('add');
});

// Menampilkan form untuk menambah buku
app.get('/add', (req, res) => {
    res.render('add');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
