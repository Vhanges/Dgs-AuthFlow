const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  icon: Icon,
}) => {
  const baseStyles =
    "w-full p-2 rounded-md font-bold text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-secondary text-white hover:bg-secondary/90",
    secondary: "bg-gray-100 hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${Icon ? "flex justify-center items-center gap-2" : ""}`}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
