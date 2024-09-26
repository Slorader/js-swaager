import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import {AuthorDTO} from "../dto/author.dto";
import {AuthorService} from "./author.service";

export class BookService {
  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll({
        include: [{
            model: Author,
            as: 'author'
        }]
    });
  }

  public async getBookById(id:number): Promise<Book | null>{
      return Book.findByPk(id);
  }

    public async createBook(
        title: string,
        publish_year: number,
        authorDTO: Author,
        isbn: string
    ): Promise<Book> {
        if (!authorDTO || !authorDTO.id) {
            throw new Error("Author is required and must have a valid ID.");
        }

        return Book.create({title: title, publish_year: publish_year, author_id: authorDTO?.id , isbn: isbn});
    }

    public async patchBook(
        id?: number,
        title?: string,
        published_year?: number,
        authorDTO?: Author,
        isbn?: string
    ): Promise<Book | null> {
        const book = await Book.findByPk(id);
        if(book)
        {
            if (title) book.title = title;
            if (published_year) book.publish_year = published_year;
            if (authorDTO) book.author = authorDTO;
            if (isbn) book.isbn = isbn;
            await book.save();
            return book;
        }
        return null;
    }


}

export const bookService = new BookService();
