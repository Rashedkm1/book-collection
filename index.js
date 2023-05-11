const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())

let books = []

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get('/books', (req, res) => {
    res.json(books);
});

// Route to add a book
app.post('/books', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1
    
    // Add the new book to the array
    books.push({id, title, author});
    
    res.json({id, title, author});
})

// Route to delete a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Find the index of the book with the specified ID
    const index = books.findIndex(book => book.id === id);

    if(index !== -1){
        // Remove the book from the array
        books.splice(index, 1);

        // Update the IDs of the remaining books
        for(let i = index; i < books.length; i++){
            books[i].id = i + 1
        }
        // return success message
        res.json({message: 'Book delete successfull'});
    } else {
        res.status(404).json({message: 'Product not found'})
    }
});

app.use((req, res) => {
    res.status(404).send('404!! Not Fount.')
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
