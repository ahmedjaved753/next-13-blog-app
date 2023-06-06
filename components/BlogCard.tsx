import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function trimString(str: string): string {
  return str.length <= 150 ? str : `${str.slice(0, 150)}...`;
}

type CardProps = React.ComponentProps<typeof Card>;

type BlogCardPropsType = {
  title: string;
  content: string;
} & CardProps;

export default function BlogCard({
  className,
  title,
  content,
  ...props
}: BlogCardPropsType) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{trimString(content)}</CardDescription>
      </CardHeader>
    </Card>
  );
}
