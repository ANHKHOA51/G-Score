import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SUBJECT_GROUPS } from '../subjects/subject-group-instances';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findOne(sbd: string): Promise<any | null> {
    const student = await this.prisma.student.findUnique({
      where: { sbd },
    });
    
    if (!student) {
      throw new NotFoundException(`Student with sbd ${sbd} not found`);
    }
    
    return student;
  }

  async getStatistics(): Promise<any> {
    return this.prisma.subjectStatistic.findMany();
  }

  private topGroupCache = new Map<string, any[]>();

  async getTopByGroup(groupCode: string): Promise<any> {
    const code = groupCode.toUpperCase();
    
    // Kiểm tra cache
    if (this.topGroupCache.has(code)) {
      return this.topGroupCache.get(code);
    }
    
    // Sử dụng $queryRaw để gộp 2 truy vấn (lấy top score & lấy chi tiết student) thành 1 lần gọi DB duy nhất
    const rawResults: any[] = await this.prisma.$queryRaw`
      SELECT s.*, sgs.total_score as "totalScore"
      FROM student_group_score sgs
      JOIN student s ON s.sbd = sgs.sbd
      WHERE sgs.group_code = ${code}
      ORDER BY sgs.total_score DESC
      LIMIT 10
    `;

    if (!rawResults || rawResults.length === 0) return [];

    const groupDef = SUBJECT_GROUPS.find(g => g.code === code);
    const subjectFields = groupDef ? groupDef.subjects : [];

    const finalResult = rawResults.map(row => {
      const result: any = {
        sbd: row.sbd,
        totalScore: row.totalScore,
      };

      if (subjectFields.length > 0) {
        for (const field of subjectFields) {
          result[field] = row[field];
        }
      } else {
        Object.assign(result, row);
      }
      return result;
    });

    // Lưu vào cache
    this.topGroupCache.set(code, finalResult);
    return finalResult;
  }

  async getGroups(): Promise<any[]> {
    return SUBJECT_GROUPS.map(g => ({
      code: g.code,
      name: g.name,
      subjects: g.subjects,
    }));
  }
}
