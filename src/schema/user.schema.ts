import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as argon from 'argon2';
@Schema({
  id: true,
  virtuals: true,
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret._id;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, trim: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type userDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    const password = await argon.hash(user.password);

    user.password = password;
    next();
  } catch (e) {
    next(e);
  }
});
