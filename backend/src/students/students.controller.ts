import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { FindOneParamsDto, GetTopGroupParamsDto } from './dto/student-params.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('reports/statistics')
  async getStatistics() {
    return this.studentsService.getStatistics();
  }

  @Get('reports/top/:groupCode')
  async getTopByGroup(@Param() params: GetTopGroupParamsDto) {
    return this.studentsService.getTopByGroup(params.groupCode);
  }

  @Get('groups')
  async getGroups() {
    return this.studentsService.getGroups();
  }

  @Get(':sbd')
  async findOne(@Param() params: FindOneParamsDto) {
    return this.studentsService.findOne(params.sbd);
  }
}
