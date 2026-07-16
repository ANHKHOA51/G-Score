import { useState, useEffect } from 'react';
import { studentApi } from '../api/studentApi';
import type { SubjectGroup, TopStudent } from '../api/studentApi';
import GroupSelector from '../components/leaderboard/GroupSelector';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

export default function Leaderboard() {
  const [groups, setGroups] = useState<SubjectGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('A00');
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await studentApi.getGroups();
        setGroups(data);
        if (data.length > 0 && !data.find(g => g.code === selectedGroup)) {
          setSelectedGroup(data[0].code);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading subject groups.');
        setIsLoading(false);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (!selectedGroup) return;
    
    const fetchTopStudents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await studentApi.getTopByGroup(selectedGroup);
        setTopStudents(data);
      } catch (err: any) {
        setError(err.message || 'Error loading leaderboard.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopStudents();
  }, [selectedGroup]);

  const currentGroupObj = groups.find(g => g.code === selectedGroup);

  if (groups.length === 0 && isLoading) {
    return (
      <div className="p-container-padding flex justify-center items-center h-[50vh]">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
      </div>
    );
  }

  return (
    <div className="p-container-padding max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Top 10 Leaderboard</h1>
          <p className="text-on-surface-variant font-body-lg">
            List of candidates with highest total scores in each group.
          </p>
        </div>
        
        {groups.length > 0 && (
          <GroupSelector 
            groups={groups} 
            selectedGroup={selectedGroup} 
            onSelect={setSelectedGroup} 
          />
        )}
      </div>

      {error ? (
        <div className="flex items-center gap-2 text-error font-label-md p-4 bg-error-container/20 rounded-lg">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
            </div>
          ) : (
            currentGroupObj && <LeaderboardTable topStudents={topStudents} group={currentGroupObj} />
          )}
        </>
      )}
    </div>
  );
}
