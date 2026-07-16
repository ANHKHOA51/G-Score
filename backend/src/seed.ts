import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { SUBJECT_GROUPS } from './subjects/subject-group-instances';
import { SUBJECTS } from './subjects/subject-instances';

const prisma = new PrismaClient();
const CSV_FILE_PATH = path.resolve(process.cwd(), '../diem_thi_thpt_2024.csv');
const BATCH_SIZE = 5000;

async function bootstrap() {
  console.log('Seeder script execution started...');

  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`CSV file not found at ${CSV_FILE_PATH}`);
    process.exit(1);
  }

  // Initialize stats map
  const statsMap: Record<string, any> = {};
  for (const subject of SUBJECTS) {
    statsMap[subject.code] = {
      subjectCode: subject.code,
      subjectName: subject.name,
      excellentCount: 0,
      goodCount: 0,
      averageCount: 0,
      poorCount: 0,
      totalCount: 0,
    };
  }

  let studentsBatch: any[] = [];
  let groupScoresBatch: any[] = [];
  let totalProcessed = 0;

  console.log(`Clearing existing data...`);
  await prisma.studentGroupScore.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.subjectStatistic.deleteMany({});
  console.log(`Existing data cleared. Starting CSV parsing...`);

  const processBatch = async () => {
    if (studentsBatch.length === 0) return;

    const currentStudents = [...studentsBatch];
    const currentScores = [...groupScoresBatch];
    studentsBatch = [];
    groupScoresBatch = [];

    await prisma.$transaction([
      prisma.student.createMany({ data: currentStudents, skipDuplicates: true }),
      prisma.studentGroupScore.createMany({ data: currentScores, skipDuplicates: true }),
    ]);

    totalProcessed += currentStudents.length;
    console.log(`Processed ${totalProcessed} rows...`);
  };

  const parseValue = (val: string) => {
    if (!val || val.trim() === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  };

  const readStream = fs.createReadStream(CSV_FILE_PATH).pipe(csvParser());

  for await (const row of readStream) {
    // Parse student data
    const student = {
      sbd: row.sbd,
      toan: parseValue(row.toan),
      ngu_van: parseValue(row.ngu_van),
      ngoai_ngu: parseValue(row.ngoai_ngu),
      vat_li: parseValue(row.vat_li),
      hoa_hoc: parseValue(row.hoa_hoc),
      sinh_hoc: parseValue(row.sinh_hoc),
      lich_su: parseValue(row.lich_su),
      dia_li: parseValue(row.dia_li),
      gdcd: parseValue(row.gdcd),
      ma_ngoai_ngu: row.ma_ngoai_ngu?.trim() || null,
    };

    studentsBatch.push(student);

    // Calculate group scores
    for (const group of SUBJECT_GROUPS) {
      let totalScore = 0;
      let hasAllSubjects = true;

      for (const subjectCode of group.subjects) {
        const score = (student as any)[subjectCode];
        if (score === null || score === undefined) {
          hasAllSubjects = false;
          break;
        }
        totalScore += score;
      }

      if (hasAllSubjects) {
        groupScoresBatch.push({
          sbd: student.sbd,
          groupCode: group.code,
          totalScore: Number(totalScore.toFixed(2)),
        });
      }
    }

    // Update statistics
    for (const subject of SUBJECTS) {
      const score = (student as any)[subject.code];
      if (score !== null && score !== undefined) {
        const stats = statsMap[subject.code];
        stats.totalCount++;
        if (score >= 8.0) stats.excellentCount++;
        else if (score >= 6.0) stats.goodCount++;
        else if (score >= 4.0) stats.averageCount++;
        else stats.poorCount++;
      }
    }

    // If batch is full, pause stream and insert
    if (studentsBatch.length >= BATCH_SIZE) {
      readStream.pause();
      await processBatch();
      readStream.resume();
    }
  }

  // Process remaining items
  await processBatch();

  console.log('Inserting Subject Statistics...');
  const statsArray = Object.values(statsMap);
  await prisma.subjectStatistic.createMany({
    data: statsArray,
  });

  console.log('Seeder completed successfully.');
  await prisma.$disconnect();
}

bootstrap().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
