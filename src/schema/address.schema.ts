import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema({
  id: true,
  virtuals: true,
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
})
export class address {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  streetName: string;

  @Prop({ required: true })
  buildingNumber: number;

  @Prop({ required: true })
  floor: number;

  @Prop({ required: true })
  apartment: number;

  @Prop({ required: true, ref: 'user' })
  userId: ObjectId;
}

export type addressDocument = HydratedDocument<address>;

export const addressSchema = SchemaFactory.createForClass(address);
