import { Injectable, NotFoundException } from "@nestjs/common";

import { book } from "./book.model";
import { constants } from "buffer";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";
import { BooksModule } from "./books.module";


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
       
        return result.id as number;
    }

    async getBooks(){
        const books = await this.bookModel.find().exec();
        
        return books as book[];
    }

    getSingleBook(title : string){
        const book = this.books.find(book => book.title === title);
        if(!book){
            throw new NotFoundException("Book not found");
        }
        return {...book}; 
    }

    updateBook(ISBN: number, title: string, author: string, description: string, yearofpublication: number){
        const book = this.books.find(book => book.title === title);
        if(!book){
            throw new NotFoundException("Book not found");
        }


        return {...book}

    }

}
