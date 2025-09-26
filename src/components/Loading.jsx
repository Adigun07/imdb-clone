const Loading = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="flex justify-center items-center gap-2 p-4">
        <span className="size-4 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.4s]"></span>
        <span className="size-4 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.2s]"></span>
        <span className="size-4 rounded-full bg-gray-400 animate-pulse"></span>
      </div>
    </div>
  );
};

export default Loading;
