const Loading = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-24 w-48 items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-orange-500/20" />

          <div className="animate-[lift_1s_ease-in-out_infinite]">
            <div className="flex items-center gap-1">
              <div className="h-12 w-2 rounded bg-orange-500" />
              <div className="h-16 w-3 rounded bg-orange-500" />
              <div className="h-4 w-24 rounded-full bg-white" />
              <div className="h-16 w-3 rounded bg-orange-500" />
              <div className="h-12 w-2 rounded bg-orange-500" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold tracking-wide">Power Pulse</p>
          <p className="mt-1 text-sm text-white/60">Loading your workout...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
