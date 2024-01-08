import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChannelService } from './channel.service';  

@Controller('channel')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}

    // @Post()
    // async createChannel(@Body('ownerId') ownerId: number, @Body('channelName') channelName: string) {
    //     return await this.channelService.createChannelForUser(ownerId, channelName, false);
    // }

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

    @Get(':channelId')
    async getChannel(@Param('channelId') channelId: number) {
        return await this.channelService.getChannelById(channelId); 
    }
    //i still need to test this using the frontend 
    @Put(':channelId/kick/:userId')
    async kickMember(
        @Param('channelId') channelId: number,
        @Param('userId') userId: number,
        @Body('requesterId') requesterId: number
    ) {
        return await this.channelService.kickUserFromChannel(channelId, userId, requesterId);
    }

    @Get(':channelId/members')
    async getChannelMembers(@Param('channelId') channelId: number) {
    return await this.channelService.getChannelMembers(channelId);
    }

    // @Delete(':channelId')
    // async deleteChannel(@Param('channelId') channelId: number) {
    //     // Implement delete logic here or in the service
    //     return 'Channel deleted!';
    // }
}
