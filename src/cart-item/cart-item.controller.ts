import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cart Items')
@Controller('cartitems')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found.' })
  findOne(@Param('id') id: number) {
    return this.cartItemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.cartItemService.remove(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Retrieve the cart associated with a user' })
  @ApiResponse({
    status: 200,
    description: 'The cart associated with the user.',
  })
  findCartByUserId(@Param('id') id: number): Promise<any> {
    return this.cartItemService.findCartByUserId(id);
  }

  @Delete('user/:id')
  @ApiOperation({ summary: 'Delete the cart associated with a user' })
  @ApiResponse({ status: 200, description: 'Cart deleted.' })
  dropCartByUserId(@Param('id') id: number): Promise<any> {
    return this.cartItemService.dropCartByUserId(id);
  }
}
