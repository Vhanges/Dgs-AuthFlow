const Divider = ({ text = "OR" }) => {
  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span className="flex-1 h-px bg-gray-400 rounded-md" />
      <span className="text-sm font-medium text-gray-400">{text}</span>
      <span className="flex-1 h-px bg-gray-400" />
    </div>
  );
};

export default Divider;
