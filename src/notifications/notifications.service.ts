import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  async createNotification(content: string, user: User): Promise<Notification> {
    const notification = this.notificationsRepository.create({ content, user, createdAt: new Date() });
    return this.notificationsRepository.save(notification);
  }

  async getUnreadCount(userId: number): Promise<number> {
    return this.notificationsRepository.count({ where: { user: { userid: userId }, isRead: false } });
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationsRepository.update({ user: { userid: userId }, isRead: false }, { isRead: true });
  }
}
