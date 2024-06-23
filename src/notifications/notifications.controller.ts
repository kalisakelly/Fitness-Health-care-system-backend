import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthenticationGuard)
  @Get('count')
  async getUnreadCount(@Req() req: any): Promise<{ count: number }> {
    const userId = req.user.id;
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  @UseGuards(AuthenticationGuard)
  @Post('mark-as-read')
  async markAllAsRead(@Req() req: any ): Promise<void> {
    const userId = req.user.id;
    await this.notificationsService.markAllAsRead(userId);
  }
}
