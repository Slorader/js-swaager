import {Body, Controller, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { BookCollectionDTO} from "../dto/bookCollection.dto";
import { bookCollectionService} from "../services/bookCollection.service";
import {string} from "joi";
import {AuthorDTO} from "../dto/author.dto";
import {authorService} from "../services/author.service";
import BookCollection from "../models/bookCollection.model";
import {BookDTO} from "../dto/book.dto";
import {bookService} from "../services/book.service";

@Route("bookCollections")
@Tags("BookCollections")
export class BookCollectionController extends Controller {

    @Get("/")
    public async getAllBookCollection(): Promise<BookCollectionDTO[]> {
        return bookCollectionService.getAllBookCollections();
    }

    @Get("{id}")
    public async getBookCollectionById(@Path() id: number): Promise<BookCollectionDTO | null> {
        const bookCollection = await bookCollectionService.getBookCollectionById(id);

        if(!bookCollection){
            const error = new Error('BookCollection not found');
            (error as any).status = 404;
            throw error;
        }
        return bookCollection;
    }

    @Post("/")
    public async createBookCollection(
        @Body() requestBody: BookCollectionDTO
    ): Promise<BookCollectionDTO> {
        const { book, available, state } = requestBody;

        if (!book || !book.id) {
            throw new Error("Book is required and must have a valid ID.");
        }

        const bookDetails = await bookService.getBookById(book.id);

        if (!bookDetails) {
            throw new Error("Book not found.");
        }

        return bookCollectionService.createBookCollection(bookDetails, available, state);
    }

    // Met à jour une bookCollection par ID
    @Patch("{id}")
    public async updateBookCollection(
        @Path() id: number,
        @Body() requestBody: BookCollectionDTO
        ): Promise<BookCollectionDTO | null> {
        const { book,available, state } = requestBody;
        const bookCollection = await bookCollectionService.getBookCollectionById(id);

        if (!book || !book.id)
        {
            throw new Error('Book not found');
        }

        const bookDetails = await bookService.getBookById(book.id);

        if (!bookDetails)
        {
            const error = new Error('Book not found');
            (error as any).status = 404;
            throw error;
        }

        return bookCollectionService.patchBookCollection(id, bookDetails, available, state);
    }

}
