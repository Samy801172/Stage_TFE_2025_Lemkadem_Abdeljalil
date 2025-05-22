import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@feature/security/guards/jwt-auth.guard';
import { RolesGuard } from '@feature/security/guards/roles.guard';
import { Roles } from '@feature/security/decorators/roles.decorator';
import { UserRole } from './entities/user-role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Update the user information
    await this.userService.put(id, updateUserDto);

    // A confirmation email will be sent to the user after the update
    return { code: 'api.common.success', result: true };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    console.log('[UserController] Appel de la route DELETE /users/' + id);
    try {
      await this.userService.remove(id);
      return { code: 'api.common.success', result: true };
    } catch (error) {
      if (error.message === 'Utilisateur déjà désactivé') {
        return { code: 'api.user.already_deactivated', message: 'Utilisateur déjà désactivé', result: false };
      }
      throw error;
    }
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async restore(@Param('id') id: string) {
    try {
      await this.userService.restore(id);
      return { code: 'api.common.success', result: true };
    } catch (error) {
      if (error.message === 'Utilisateur déjà actif') {
        return { code: 'api.user.already_active', message: 'Utilisateur déjà actif', result: false };
      }
      throw error;
    }
  }

  /**
   * Récupère la liste des contacts potentiels pour l'utilisateur authentifié
   * @returns Liste des contacts (utilisateurs actifs)
   */
  @Get('contacts')
  @UseGuards(JwtAuthGuard)
  async getContacts(@Req() req) {
    return this.userService.findContacts(req.user.userId);
  }
}
