import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BooksService } from './books.service';


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
        
        return this.booksService.getBooks();
    }

    @Get(':title')
    getBook(@Param('title') title: string,){
        return this.booksService.getSingleBook(title); 
    }

    @Patch(':title')
    updateBook(
        @Param('ISBN') ISBN: number,
        @Body('title') booktitle: string,
        @Body('author') bookauthor: string,
        @Body('Description') bookdes: string,
        @Body('yearofpublication') bookpub: string
    ) {

    }
}


