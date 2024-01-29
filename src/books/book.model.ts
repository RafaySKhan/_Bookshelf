import * as mongoose from 'mongoose'

export const BookSchema = new mongoose.Schema({

    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    yearofpublication: {type: Number, required: true}

})

export interface book{

        ISBN: number,
        title: string,
        author:string, 
        description: string,
        yearofpublication: number

}