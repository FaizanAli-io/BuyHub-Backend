import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

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
}
