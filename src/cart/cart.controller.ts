import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found.' })
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }
}
