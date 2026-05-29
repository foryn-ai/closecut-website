import { cn } from "@/lib/utils";
import { card } from "@/lib/ui/classes";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `${card} group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border p-4 transition duration-200 hover:shadow-[0_20px_50px_var(--color-shadow)]`,
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="t-h4-sans mt-2 mb-2">
          {title}
        </div>
        <div className="t-body-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
