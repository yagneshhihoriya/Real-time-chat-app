import { Schema } from 'mongoose';

export const RoomSchema = new Schema(
  {
    name: String,
    members: [Schema.Types.ObjectId],
    createdBy: Schema.Types.ObjectId,
    createAt: Date,
  },
  {
    collection: 'rooms',
  },
);
