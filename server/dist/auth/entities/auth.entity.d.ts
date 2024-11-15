import { Document } from 'mongoose';
export declare class auth extends Document {
    name: string;
    email: string;
    password: string;
}
export declare const authSchema: import("mongoose").Schema<auth, import("mongoose").Model<auth, any, any, any, Document<unknown, any, auth> & auth & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, auth, Document<unknown, {}, import("mongoose").FlatRecord<auth>> & import("mongoose").FlatRecord<auth> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
