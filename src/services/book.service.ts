import BookStore from "../models/book.module";
import { Book } from "../models/types/book.types";

export class bookService {
    static async getBooks() {
        const books = await BookStore.index();
        return books;
    }
    static async getBook(id: string) {
        const book = await BookStore.show(id);
        return book;
    }
    static async addBook(b: Book) {
        const book = await BookStore.create(b);
        return book;
    }
    static async deleteBook(id: string) {
        const book = await BookStore.delete(id);
        return book;
    }
}