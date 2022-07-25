import { Schema } from 'mongoose';

export const MessagesSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    },
    receiver: Schema.Types.ObjectId,
    message: String,
    createAt: Date,
    room: Schema.Types.ObjectId,
  },
  {
    collection: 'messages',
  },
);
