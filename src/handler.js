const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBook);

    // const isEmpty = name.match(/[aeiou]/gi);

    if (name === undefined) {
        const response = res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = res.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = res.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (req, res) => {
    const response = res.response({
        status: "success",
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })
            ),
        },
    });
    response.code(200);
    return response;
}

const getBookByIdHandler = (req, res) => {
    const newId = req.params.id
    const bookId = books.find((arg) => arg.id === newId);

    if (bookId !== undefined) {
        const response = res.response({
            status: 'success',
            data: {
                bookId,
            },
        });
        response.code(200);
        return response;
    }

    const response = res.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// const editBookByIdHandler = (req, res) => {
//     const { id } = req.params;
  
//     const { title, tags, body } = req.payload;
//     const updatedAt = new Date().toISOString();
//     const index = notes.findIndex((note) => note.id === id);
  
//     if (index !== -1) {
//       notes[index] = {
//         ...notes[index],
//         title,
//         tags,
//         body,
//         updatedAt,
//       };
  
//       const response = res.response({
//         status: 'success',
//         message: 'Catatan berhasil diperbarui',
//       });
//       response.code(200);
//       return response;
//     }
  
//     const response = res.response({
//       status: 'fail',
//       message: 'Gagal memperbarui catatan, id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
//   };
  
//   const deleteBookByIdHandler = (req, res) => {
//     const { id } = req.params;
//     const index = notes.findIndex((note) => note.id === id);
  
//     if (index !== -1) {
//       notes.splice(index, 1);
//       const response = res.response({
//         status: 'success',
//         message: 'Catatan berhasil dihapus',
//       });
//       response.code(200);
//       return response;
//     }
  
//     const response = res.response({
//       status: 'fail',
//       message: 'Catatan gagal dihapus, Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
//   };

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };