import { Button } from "@material-tailwind/react";

export function DefaultSkeleton() {
  return (
    <Button className="loading-button" loading={true} color="white" size="lg">
      Loading
    </Button>
  );
}
