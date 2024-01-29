import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BooksModule, MongooseModule.forRoot('mongodb+srv://rsajid:X7wA3QmdL9ltKfGx@cluster0.xi5zjac.mongodb.net/bookshelf-DB?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
