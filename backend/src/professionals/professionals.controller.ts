import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfessionalsService } from './professionals.service';
import { ApplyProfessionalDto, UpdateProfessionalDto } from './professionals.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  // Public — any professional can apply
  @Post('apply')
  async apply(@Body() dto: ApplyProfessionalDto) {
    return this.professionalsService.apply(dto);
  }

  // Admin only — list all professionals
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(
    @Query('estado') estado?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.professionalsService.findAll({
      estado,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  // Professional — get leads assigned to me
  @UseGuards(AuthGuard('jwt'))
  @Get('me/leads')
  async myLeads(@Request() req: any) {
    return this.professionalsService.findLeadsForProfessional(
      req.user.profesionalId,
    );
  }

  // Admin — get single professional
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  // Admin — update professional
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProfessionalDto) {
    return this.professionalsService.update(id, dto);
  }
}
