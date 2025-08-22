export default function Button({
    children,
    className = "",
    size = "md",
    variant = "solid",
    ...props
  }) {
    const sizes = {
      sm: "text-sm px-3 py-1.5 rounded-lg",
      md: "text-sm px-4 py-2 rounded-xl",
    };
    const variants = {
      solid: "bg-blue-600 text-white hover:bg-blue-700",
      soft: "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",
      ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
    };
    return (
      <button className={`${sizes[size]} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  