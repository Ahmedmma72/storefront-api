import { Router } from "express";
import { bookService } from "../services/book.service";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
    const books = await bookService.getBooks();
    res.send({statusCode: 200, data: books});
});

bookRouter.get("/:id", async (req, res) => {
    const book = await bookService.getBook(req.params.id);
    res.send({statusCode: 200, data: book});
});

bookRouter.post("/", async (req, res) => {
    const book = await bookService.addBook(req.body);
    res.send({statusCode: 200, data: book});
});

bookRouter.delete("/:id", async (req, res) => {
    const book = await bookService.deleteBook(req.params.id);
    res.send({statusCode: 200, data: book});
});

export default bookRouter;
