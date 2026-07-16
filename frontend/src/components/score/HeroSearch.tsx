import { useState } from 'react';

interface HeroSearchProps {
  onSearch: (sbd: string) => void;
  isLoading: boolean;
  error: string | null;
  searchedSbd: string | null;
}

export default function HeroSearch({ onSearch, isLoading, error, searchedSbd }: HeroSearchProps) {
  const [sbd, setSbd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sbd.trim().length > 0) {
      onSearch(sbd.trim());
    }
  };

  return (
    <section className="glass-card p-stack-lg rounded-xl shadow-sm bg-surface-container-lowest border border-outline-variant">
      <div className="text-center mb-stack-lg">
        <h2 className="font-headline-xl text-headline-xl text-primary mb-2">High School Exam 2024 Score Lookup</h2>
        <p className="text-on-surface-variant font-body-lg">
          Enter your registration number to view the official exam results from the national database.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary">
            fingerprint
          </span>
          <input
            className="w-full pl-12 pr-4 py-4 bg-white border border-outline rounded-lg font-headline-md text-primary focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all outline-none"
            placeholder="Registration number (8 digits)"
            type="text"
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || sbd.trim().length === 0}
          className="w-full md:w-auto px-10 py-4 bg-secondary text-on-primary rounded-lg font-headline-md hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin">refresh</span>
          ) : (
            <span className="material-symbols-outlined">search</span>
          )}
          Lookup
        </button>
      </form>

      {error && (
        <div className="mt-4 flex items-center justify-center gap-2 text-error font-label-md">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      {searchedSbd && !error && !isLoading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-label-md">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          Information found for registration number:&nbsp;{searchedSbd}
        </div>
      )}
    </section>
  );
}
