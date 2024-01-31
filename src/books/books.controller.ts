import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { title } from 'process';


@Controller('books')
export class BooksController{

    constructor(private readonly booksService: BooksService) {}

    @Post()
    async addBook(
        @Body('Title') booktitle: string,
        @Body('Author') bookauthor: string,
        @Body('Description') bookdec: string,
        @Body('YearOfPublication') bookpub: number
    ){

       const generatedISBN = await this.booksService.insertBook(
            booktitle, 
            bookauthor, 
            bookdec, 
            bookpub
        );
       
       return { ISBN: generatedISBN };
    }

    @Get()
    async getAllBooks(){
        const books = await this.booksService.getBooks();

        return books;
    }

    @Get(':title')
    getBook(@Param('title') title: string,){
        
        return this.booksService.getSingleBook(title); 
        
    }

    @Patch(':ISBN')
    async updateBook(
        @Param('ISBN') ISBN: string,
        @Body('title') booktitle: string,
        @Body('author') bookauthor: string,
        @Body('Description') bookdes: string,
        @Body('yearofpublication') bookpub: number,
    ) {
        await this.booksService.updateBook(ISBN, booktitle, bookauthor, bookdes, bookpub);

        return null;
    }

    @Delete(':ISBN')
    async removeBook(@Param('ISBN') ISBN: string){
        
        await this.booksService.deleteBook(ISBN);

        return null;

    }



}


