export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-center">
          User Stream
        </h1>

        <p className="text-sm text-slate-400 text-center mb-6">
          Live user search powered by RxJS
        </p>

        <input
          type="text"
          placeholder="Search users..."
          disabled
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        <div className="mt-4 text-center text-sm text-slate-500">
          Results will appear here
        </div>
      </div>
    </main>
  );
}