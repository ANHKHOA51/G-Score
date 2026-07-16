const API_BASE_URL = 'http://localhost:3000';

export interface StudentScore {
  sbd: string;
  toan?: number | null;
  ngu_van?: number | null;
  ngoai_ngu?: number | null;
  vat_li?: number | null;
  hoa_hoc?: number | null;
  sinh_hoc?: number | null;
  lich_su?: number | null;
  dia_li?: number | null;
  gdcd?: number | null;
  ma_ngoai_ngu?: string | null;
}

export interface SubjectStatistic {
  id: number;
  subjectCode: string;
  excellentCount: number;
  goodCount: number;
  averageCount: number;
  poorCount: number;
}

export interface SubjectGroup {
  code: string;
  name: string;
  subjects: string[];
}

export interface TopStudent {
  sbd: string;
  totalScore: number;
  [key: string]: any;
}

const cache: Record<string, any> = {};

export const studentApi = {
  getStudentBySbd: async (sbd: string): Promise<StudentScore> => {
    const response = await fetch(`${API_BASE_URL}/students/${sbd}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Candidate not found with this registration number.');
      }
      throw new Error('Server error. Please try again later.');
    }
    return response.json();
  },

  getStatistics: async (): Promise<SubjectStatistic[]> => {
    if (cache['statistics']) return cache['statistics'];

    const response = await fetch(`${API_BASE_URL}/students/reports/statistics`);
    if (!response.ok) {
      throw new Error('Error loading statistics data.');
    }
    const data = await response.json();
    cache['statistics'] = data;
    return data;
  },

  getGroups: async (): Promise<SubjectGroup[]> => {
    if (cache['groups']) return cache['groups'];

    const response = await fetch(`${API_BASE_URL}/students/groups`);
    if (!response.ok) {
      throw new Error('Error loading subject groups.');
    }
    const data = await response.json();
    cache['groups'] = data;
    return data;
  },

  getTopByGroup: async (groupCode: string): Promise<TopStudent[]> => {
    if (cache[`top_${groupCode}`]) return cache[`top_${groupCode}`];

    const response = await fetch(`${API_BASE_URL}/students/reports/top/${groupCode}`);
    if (!response.ok) {
      throw new Error('Error loading leaderboard.');
    }
    const data = await response.json();
    cache[`top_${groupCode}`] = data;
    return data;
  }
};
