import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// mongoose document middleware
// mongoose middleware / hook
// pre save middleware to has the password using bcrypt
userSchema.pre('save', async function (next) {
  // console.log(this, "Pre hook, we will save data");
  const user = this;
  // hashing the password with bcrypt
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware
userSchema.post('save', function (doc, next) {
  // console.log(this, 'Post hook, we have already saved data');
  // make this empty string because password kokhno open share kore bhalo na,
  // tai pre stage password database save kora hoyegechhe.
  // tai ekhon aar password show na korleo hobe
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
