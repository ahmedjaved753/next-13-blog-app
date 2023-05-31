import { AlertCircle, FileWarning, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type AlertPropsType = {
  variant: "default" | "destructive" | null | undefined;
  title: string;
  description: string;
  className: string;
};
export default function AlertComponent({
  variant,
  title,
  description,
  className,
}: AlertPropsType) {
  return (
    <Alert className={className} variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
