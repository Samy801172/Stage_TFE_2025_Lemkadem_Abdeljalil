import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@feature/security/guards/jwt-auth.guard';

@ApiTags('messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(req.user.id, createMessageDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all messages for the user' })
  findAll(@Request() req) {
    return this.messageService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a message by id' })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Post(':id/read')
  @ApiResponse({ status: 200, description: 'Mark message as read' })
  markAsRead(@Param('id') id: string) {
    return this.messageService.markAsRead(id);
  }
} 