import express from 'express';
import {bookList, generateUniqueId, saveBooks} from './data/books.js';

const app = express();

app.use(express.json())

app.get('/api/melvingreatbooks', (req, res) => {
    res.send(bookList)
});

app.get('/api/melvingreatbooks/:id', (req, res) => {
    const bookId = req.params.id;
    const single = bookList.findIndex(c => c.id == bookId)

    if (single === -1) return res.status(400).send({error: 'No boook found at specified index '})

    res.send(single)
});

app.put('/api/melvingreatbooks/:id', (req, res) => {
    const singleId = bookList.find(e => e.id == req.params.id);

    if(!singleId) return res.status(400).send({error: 'Book with requested id not found'})

    const info = req.body;

    singleId.author = info.author || singleId.author;
    singleId.title = info.title || singleId.tite;
    singleId.genre = info.genre || singleId.genre;
    singleId.datePublished = Date.now()

    saveBooks()

    res.send(singleId)
});

app.post('/api/melvingreatbooks', (req, res) => {
    const datum = req.body;

    const payload = {
        id: generateUniqueId(),
        author: datum.author.trim(),
        title: datum.title.trim(),
        genre: datum.genre.trim(),
        datePublished: Date.now()
    };

    if (!payload.author || payload.title || payload.genre) {
        return res.status(400).send({error: "Input fields cannot be empty"})
    }
    bookList.push(payload);
    saveBooks()
    res.status(201).send(bookList)
});

app.delete('/api/melvingreatbooks/:id', (req, res) => {

    const deletedBook = bookList.findIndex(d => d.id == req.params.id);

    if (deletedBook === -1) return res.status(401).send({error: "Book not available"});

    const [bookIndex] = bookList.splice(deletedBook, 1)

    saveBooks()
    res.send(bookIndex)
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at: ${PORT}`)
})