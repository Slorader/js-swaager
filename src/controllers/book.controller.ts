import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";
import {AuthorDTO} from "../dto/author.dto";
import {AuthorService, authorService} from "../services/author.service";
import {string} from "joi";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Post("/")
  public async createBook(
      @Body() requestBody: BookDTO
  ): Promise<BookDTO> {
    const { title, publish_year, author, isbn } = requestBody;

    if (!author || !author.id) {
      throw new Error("Author is required and must have a valid ID.");
    }

    const authorDetails = await authorService.getAuthorById(author.id);

    if (!authorDetails) {
      throw new Error("Author not found.");
    }

    return bookService.createBook(title, publish_year, authorDetails, isbn);
  }


  // Met à jour un book par ID
  @Patch("{id}")
  public async updateBook(
      @Path() id: number,
      @Body() requestBody: BookDTO
  ): Promise<BookDTO | null> {
    const { title,publish_year, author, isbn } = requestBody;

    if (!author || !author.id)
    {
      throw new Error('Author not found');
    }

    const authorDetail = await authorService.getAuthorById(author.id);

    if (!authorDetail)
    {
      const error = new Error('Author not found');
      (error as any).status = 404;
      throw error;
    }

    return bookService.patchBook(id, title,  publish_year, authorDetail, isbn);
  }

  // Supprime un livre par ID
  @Delete("{id}")
  public async deleteBook(@Path() id: number): Promise<void> {
    try {
      await bookService.deleteBook(id);
    } catch (error) {
      const err = new Error((error as Error).message);
      (err as any).status = 400;
      throw err;
    }
  }

}