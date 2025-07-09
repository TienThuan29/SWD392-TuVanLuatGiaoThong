type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | (string & {});

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  absolute?: boolean;
}

export default function Spinner_C({
  size = "md",
  color = "blue-500",
  className = "",
  absolute = false,
}: SpinnerProps = {}) {
  // Size mapping
  const sizeClasses: Record<Exclude<SpinnerSize, string>, string> = {
    xs: "h-4 w-4 border-2",
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
    xl: "h-20 w-20 border-[6px]",
  };

  // Get size class or use custom size if provided
  const sizeClass = (size in sizeClasses ? sizeClasses[size as keyof typeof sizeClasses] : size);

  // Position class
  const positionClass = absolute ? "absolute" : "";

  return (
    <div
      className={`
        rounded-full 
        ${sizeClass}
        border-gray-200 
        dark:border-gray-700
        border-t-${color} 
        animate-spin 
        ${positionClass}
        ${className}
        transition-colors
        duration-300
      `
        .trim()
        .replace(/\s+/g, " ")}
    />
  );
}

// Usage examples:
// <Spinner />
// <Spinner size="sm" />
// <Spinner size="lg" color="red-500" />
// <Spinner size="h-8 w-8 border-2" color="green-600" />
// <Spinner absolute className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
