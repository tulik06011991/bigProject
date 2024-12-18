import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from  'mongoose';


@Schema()

export class  auth extends Document{
    @Prop({required: true})
    name: string
    @Prop({required: true, unique: true})
    email: string
    @Prop({required: true})
    password: string    
}

export const authSchema  = SchemaFactory.createForClass(auth)