import { IsEmail, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole, default: UserRole.MEMBER })
  type_user: UserRole = UserRole.MEMBER;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  telephone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  entreprise?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  secteur?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  bio?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  photo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  linkedin?: string;
} 