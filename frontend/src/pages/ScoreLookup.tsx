import { useState } from 'react';
import HeroSearch from '../components/score/HeroSearch';
import ScoreGrid from '../components/score/ScoreGrid';
import { studentApi } from '../api/studentApi';
import type { StudentScore } from '../api/studentApi';

export default function ScoreLookup() {
  const [student, setStudent] = useState<StudentScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedSbd, setSearchedSbd] = useState<string | null>(null);

  const handleSearch = async (sbd: string) => {
    setIsLoading(true);
    setError(null);
    setSearchedSbd(null);
    setStudent(null);
    
    try {
      if (!/^\d{8}$/.test(sbd)) {
        throw new Error("Registration number must be 8 digits.");
      }

      const data = await studentApi.getStudentBySbd(sbd);
      setStudent(data);
      setSearchedSbd(sbd);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-container-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        <HeroSearch 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          error={error} 
          searchedSbd={searchedSbd} 
        />
        
        {student && <ScoreGrid student={student} />}
      </div>
    </div>
  );
}
