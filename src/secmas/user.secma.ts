import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop()
  account: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: string;

  @Prop({ default: '/images/boy.png'})
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  async conparePassword(_password:string) {
    let userpassword = await bcrypt.compare(_password, this.password)
    return userpassword
  }
}
