/** Library model definitions **/

export enum BookStatusModel {
    PUBLISH = 'PUBLISH',
    UNPUBLISH = 'UNPUBLISH'
}
export interface BookModel {
    id: number;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: Date;
    thumbnailUrl?: string;
    shortDescription: string;
    longDescription: string;
    status: BookStatusModel;
    categories: string[];
}

export interface ViewBookModel {
    inProgress: boolean;
    error: object | undefined;
    message: string | undefined;
    list: BookModel[];
}
