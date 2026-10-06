import {bookList, generateUniqueId, saveBooks} from '../data/books.js';

export const getUsers = (req, res) => {
    res.send(bookList)
};

export const getSingleUser = (req, res) => {
    const bookId = req.params.id;
    const single = bookList.find(c => c.id === bookId)

    if (!single) return res.status(400).send({error: 'No boook found at specified index '})

    res.send(single)
};

export const createUsers = (req, res) => {
    const datum = req.body;

    const payload = {
        id: generateUniqueId(),
        author: datum.author.trim(),
        title: datum.title.trim(),
        genre: datum.genre.trim(),
        datePublished: Date.now()
    };

    if (!payload.author || !payload.title || !payload.genre) {
        return res.status(400).send({error: "Input fields cannot be empty"})
    }
    bookList.push(payload);
    saveBooks()
    res.status(201).send(bookList)
};

export const deleteUser = (req, res) => {

    const deletedBook = bookList.findIndex(d => d.id === req.params.id);

    if (deletedBook === -1) return res.status(401).send({error: "Book not available"});

    const [bookIndex] = bookList.splice(deletedBook, 1)

    saveBooks()
    res.send(bookIndex)
};

export const editUser = (req, res) => {
    const singleId = bookList.find(e => e.id === req.params.id);

    if(!singleId) return res.status(400).send({error: 'Book with requested id not found'})

    const info = req.body;

    singleId.author = info.author || singleId.author;
    singleId.title = info.title || singleId.title;
    singleId.genre = info.genre || singleId.genre;
    singleId.datePublished = Date.now()

    saveBooks()

    res.send(singleId)
};