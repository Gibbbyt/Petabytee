export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-midnight to-brand-purple">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <div className="loading-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="loading-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="loading-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <h2 className="text-2xl font-bold text-white animate-pulse-glow">
          Duke ngarkuar...
        </h2>
      </div>
    </div>
  );
}