export default function MacWindowFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl glass-panel overflow-hidden border border-slate-200/50 dark:border-slate-700/50 flex flex-col transition-all duration-300">
      {/* Title Bar */}
      <div className="h-10 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center px-4 relative z-10">
        <div className="flex gap-2 items-center w-20">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500 shadow-sm" />
        </div>
        <div className="flex-1 text-center font-medium text-xs text-slate-500 dark:text-slate-400 tracking-wide select-none">
          {title}
        </div>
        <div className="w-20" /> {/* Spacer to center title */}
      </div>
      {/* Content Area */}
      <div className="p-6 md:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm min-h-[400px] flex flex-col">
        {children}
      </div>
    </div>
  );
}
