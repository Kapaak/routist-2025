import { Link, Text } from "../../atoms";

interface TextLinkProps {
  text: string;
  action: string;
  href: string;
}

export const TextLink = ({ action, href, text }: TextLinkProps) => {
  return (
    <div className="flex gap-2">
      <Text className="font-light" size="small">
        {text}
      </Text>
      <Link href={href}>
        <Text color="secondary" size="small">
          {action}
        </Text>
      </Link>
    </div>
  );
};
