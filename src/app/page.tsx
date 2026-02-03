'use client'

import { useEffect, useRef, useState } from "react";
import { fromEvent, of, from } from "rxjs";
import { debounceTime, map, switchMap, catchError } from "rxjs/operators";

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<GithubUser[]>([]);

  useEffect(() => {
    if (!inputRef.current) return;

    const input$ = fromEvent(inputRef.current, "input").pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      switchMap((query) => {
        if (!query) return of([]);

        return from(
          fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(data => data.items || [])
        ).pipe(
          catchError(() => of([]))
        );
      })
    );

    const subscription = input$.subscribe(setUsers);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-center">User Stream</h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Live user search powered by RxJS
        </p>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search GitHub users..."
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        {users.length === 0 && <div className="mt-4 text-center text-sm text-slate-500">
          Results will appear here
        </div>}

        <ul className="mt-4">
          {users.slice(0, 5).map((user) => (
            <li key={user.id} className="flex items-center border-b border-gray-600 py-2 gap-2">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 rounded-full"
              />
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:underline"
              >
                {user.login}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
