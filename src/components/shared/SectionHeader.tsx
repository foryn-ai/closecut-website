import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      <Heading role="h2">{title}</Heading>
      {subtitle ? (
        <Text role="bodySmall" measure="narrow" className="text-body">
          {subtitle}
        </Text>
      ) : null}
    </div>
  );
}
