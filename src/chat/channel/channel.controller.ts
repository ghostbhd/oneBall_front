import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChannelService } from './channel.service';  // Update this path accordingly

@Controller('channel')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}

    @Post()
    async createChannel(@Body('ownerId') ownerId: number, @Body('channelName') channelName: string) {
        return await this.channelService.createChannelForUser(ownerId, channelName);
    }

    @Post(':channelId/member/:userId')
    async addMember(@Param('channelId') channelId: number, @Param('userId') userId: number) {
        return await this.channelService.addMemberToChannel(channelId, userId);
    }

    @Post(':channelId/message')
    async sendMessage(
        @Param('channelId') channelId: number,
        @Body('senderId') senderId: number,
        @Body('content') content: string
    ) {
        return await this.channelService.sendMessageToChannel(channelId, senderId, content);
    }

    // I'm adding a simple GET endpoint to fetch a channel by its ID. You can expand on this.
    @Get(':channelId')
    async getChannel(@Param('channelId') channelId: number) {
        return await this.channelService.getChannelById(channelId);  // You need to add `getChannelById` method in your service
    }

    // As a placeholder, if you decide to add update and delete operations:
    // @Put(':channelId')
    // async updateChannel(@Param('channelId') channelId: number, @Body() updateChannelDto: any) {
    //     // Implement update logic here or in the service
    //     return 'Channel updated!';
    // }

    // @Delete(':channelId')
    // async deleteChannel(@Param('channelId') channelId: number) {
    //     // Implement delete logic here or in the service
    //     return 'Channel deleted!';
    // }
}
