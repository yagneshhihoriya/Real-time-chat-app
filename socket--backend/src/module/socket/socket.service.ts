import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SocketService {
  constructor(
    @Inject('MessageModel') private messageModel: Model<any>,
    @Inject('RoomModel') private roomModel: Model<any>,
    @Inject('UserModel') private userModel: Model<any>,
  ) {}
  public onlineUsers: any[] = [];

  async addMessage(message: any) {
    try {
      if (
        (message?.room && message?.message && message?.sender) ||
        (message?.room && message?.sender && message?.receiver)
      ) {
        const res = await this.messageModel.create({
          sender: message.sender,
          receiver: message.receiver,
          message: message.message,
          room: message.room,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createRoom(roomData: any) {
    try {
      if (roomData?.name && roomData?.createdBy) {
        const res = await this.roomModel.create({
          name: roomData.name,
          createdBy: roomData.createdBy,
          members: [roomData.createdBy, ...(roomData?.members || [])],
          createdAt: new Date(),
        });
        return res;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getMessagesById(sender: string, receiver: string) {
    try {
      if (sender && receiver) {
        return await this.messageModel.find({
          $or: [
            {
              sender,
              receiver,
            },
            {
              sender: receiver,
              receiver: sender,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getRoomMessages(room: string) {
    try {
      return await this.messageModel
        .find({
          room,
        })
        .populate({ path: 'sender', select: 'name' });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRooms(userId: string) {
    try {
      return await this.roomModel
        .find({
          members: userId,
        })
        .lean();
    } catch (error) {
      console.log(error);
    }
  }

  async exitRoom(roomId: string, userId: string) {
    try {
      const res = await this.roomModel.updateOne(
        {
          _id: roomId,
        },
        {
          $pull: {
            members: userId,
          },
        },
      );
      if (res.modifiedCount > 0) {
        return this.userModel.findById(userId);
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
