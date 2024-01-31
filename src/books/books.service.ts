import { Injectable, NotFoundException } from "@nestjs/common";
import { book } from "./book.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { identity } from "rxjs/internal/util/identity";


@Injectable()

export class BooksService{
    private books: book[] = [];

    constructor(@InjectModel('Book') private readonly bookModel: Model<book>)
    {}

    async insertBook(title: string, author: string, description: string, yearofpublication: number){
        const newBook = new this.bookModel({
            title, 
            description, 
            author, 
            yearofpublication 
        });
        
        const result = await newBook.save();
       
        return result.ISBN as string;
    }

    async getBooks(){
        const books = await this.bookModel.find().exec();
        
        return books.map(book => ({ISBN: book.ISBN, title: book.title, author: book.author, description: book.description, yearofpublication: book.yearofpublication}));
    }

    async getSingleBook(title : string){
        const book = await this.findbook(title)[0];
         
        return {ISBN: book._ISBN, title: book.title, author: book.author, description: book.description, yearofpublication: book.yearofpublication};
    }    
        

    async updateBook(ISBN: string, title: string, author: string, description: string, yearofpublication: number){
        const updatedBook = await this.findbook(ISBN);

        if(title){

            updatedBook.title = title;
        }

        if(author){

            updatedBook.author = author;
        }

        if(description){

            updatedBook.description = description;
        }
    
        if(yearofpublication){

            updatedBook.yearofpublication = yearofpublication;
        }

        updatedBook.save();

    }

    async deleteBook(ISBN : string){

        const result = await this.bookModel.deleteOne({_ISBN: ISBN}).exec();

        /*if (result.n === 0){
            throw new NotFoundException('Could not find book');
        }*/
        console.log(result);
    }

    private async findbook(title: string): Promise<book> {

        let book;
        try {

            book = await this.bookModel.findById(title).exec();
        } catch(error){

            throw new NotFoundException('Could not find book');
        }

        if(!book){
            throw new NotFoundException('Could not find book');
        }

        return book;

        /*const bookIndex = this.books.findIndex(book => book.ISBN === ISBN);
        const book = this.books[bookIndex];
        
        if(!book){

            throw new NotFoundException("Book not found");
        }
        return [book, bookIndex];*/

    }

}
