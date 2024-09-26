import {Book} from "../models/book.model";
import {Author} from "../models/author.model";
import BookCollection from "../models/bookCollection.model";
import {AuthorService} from "./author.service";
import {BookDTO} from "../dto/book.dto";

export class BookCollectionService {

    public async getAllBookCollections(): Promise<BookCollection[]> {
        return BookCollection.findAll();
    }

    public async getBookCollectionById(id:number): Promise<BookCollection | null>{
        return BookCollection.findByPk(id);
    }

    public async createBookCollection(
        bookDTO: Book,
        available: boolean,
        state: number
    ): Promise<BookCollection> {
        if (!bookDTO || !bookDTO.id) {
            throw new Error("Book is required and must have a valid ID.");
        }

        return BookCollection.create({book_id: bookDTO?.id, available: available, state:state });
    }

    public async patchBookCollection(
        id?: number,
        bookDTO?: Book,
        available?: boolean,
        state?: number,
    ): Promise<BookCollection | null> {
        const bookCollection = await BookCollection.findByPk(id);
        if(bookCollection)
        {
            if (bookDTO) bookCollection.book = bookDTO;
            if (available) bookCollection.available = available;
            if (state) bookCollection.state = state;
            await bookCollection.save();
            return bookCollection;
        }
        return null;
    }

    // Supprime une collection de livres par ID
    public async deleteBookCollection(id: number): Promise<void> {
        const bookCollection = await BookCollection.findByPk(id);
        if (!bookCollection) {
            throw new Error("BookCollection not found");
        }

        await bookCollection.destroy();
    }


}

export const bookCollectionService = new BookCollectionService();
