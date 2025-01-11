import { Text } from "~/ui/components/atoms";

interface RouteLabelProps {
  title: string;
  description?: string | null | number;
}

export const RouteTitleDescription = ({
  description,
  title,
}: RouteLabelProps) => {
  return (
    <div>
      <Text color="gray" size="small">
        {title}
      </Text>
      <Text className="ml-2 mt-1">{description}</Text>
    </div>
  );
};
