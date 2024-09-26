import { Model, DataTypes } from "sequelize";
import { Book} from "./book.model";
import sequelize from "../config/database";
import {Author} from "./author.model";

export interface BookCollectionAttributes {
    id?: number;
    book_id: number;
    available: boolean;
    state: number;
}

export class BookCollection
    extends Model<BookCollectionAttributes>
    implements BookCollectionAttributes
{
    public id?: number;
    public book_id!: number;
    public available!: boolean;
    public state!: number;
    public book?: Book;

}

BookCollection.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "BookCollection",
    }
);

BookCollection.belongsTo(Book, {foreignKey: 'book_id', as: 'book'})

export default BookCollection;
