import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async create(senderId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create({
      content: createMessageDto.content,
      sender: { id: senderId },
      receiver: { id: createMessageDto.receiverId }
    });
    return await this.messageRepository.save(message);
  }

  async findAll(userId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } }
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver']
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async remove(id: string): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }
  }

  async findUserMessages(userId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } }
      ],
      relations: ['sender', 'receiver']
    });
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.findOne(id);
    message.is_read = true;
    return await this.messageRepository.save(message);
  }
} 