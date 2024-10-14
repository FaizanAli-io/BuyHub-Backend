import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiQuery({ name: 'role', required: false })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll(@Query('role') role?: 'BUYER' | 'SELLER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/cart')
  @ApiOperation({ summary: 'Retrieve the cart associated with a user' })
  @ApiResponse({
    status: 200,
    description: 'The cart associated with the user.',
  })
  findCartByUserId(@Param('id') id: number) {
    return this.userService.findCartByUserId(id);
  }

  @Delete(':id/cart')
  @ApiOperation({ summary: 'Delete the cart associated with a user' })
  @ApiResponse({ status: 200, description: 'Cart deleted.' })
  dropCartByUserId(@Param('id') id: number) {
    return this.userService.dropCartByUserId(id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Retrieve all products associated with a user' })
  @ApiResponse({
    status: 200,
    description: 'List of products associated with the user.',
  })
  findProductsByUserId(@Param('id') id: number) {
    return this.userService.findProductsByUserId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
