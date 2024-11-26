import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TopProductByRating, TopProductByPurchases } from './analytics.service';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('admin')
  @ApiOperation({ summary: 'Get analytics for the admin' })
  @ApiResponse({
    status: 200,
    description: 'Admin analytics data retrieved successfully.',
  })
  async getAdminAnalytics() {
    return this.analyticsService.getAdminAnalytics();
  }

  @Get('buyer/:id')
  @ApiOperation({ summary: 'Get analytics for a buyer' })
  @ApiResponse({
    status: 200,
    description: 'Buyer analytics data retrieved successfully.',
  })
  async getBuyerAnalytics(@Param('id') id: number) {
    return this.analyticsService.getBuyerAnalytics(id);
  }

  @Get('seller/:id')
  @ApiOperation({ summary: 'Get analytics for a seller' })
  @ApiResponse({
    status: 200,
    description: 'Seller analytics data retrieved successfully.',
  })
  async getSellerAnalytics(@Param('id') id: number) {
    return this.analyticsService.getSellerAnalytics(id);
  }

  @Get('top-products/rating')
  @ApiOperation({ summary: 'Get top 10 products by rating' })
  @ApiResponse({
    status: 200,
    description: 'Top products by rating retrieved successfully.',
  })
  async getTopProductsByRating(): Promise<TopProductByRating[]> {
    return this.analyticsService.getTopProductsByRating();
  }

  @Get('top-products/purchases')
  @ApiOperation({ summary: 'Get top 10 products by purchases' })
  @ApiResponse({
    status: 200,
    description: 'Top products by purchases retrieved successfully.',
  })
  async getTopProductsByPurchases(): Promise<TopProductByPurchases[]> {
    return this.analyticsService.getTopProductsByPurchases();
  }
}
