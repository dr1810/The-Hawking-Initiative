import { Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ModuleCardProps = {
  title: string;
  minutes: number;
  progress: number;
  focus: string;
};

export function ModuleCard({ title, minutes, progress, focus }: ModuleCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="outline">{focus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="size-4" aria-hidden="true" />
          {minutes} minute session
        </div>
        <Progress value={progress} aria-label={`${title} completion`} />
        <p className="text-sm text-muted-foreground">{progress}% completed</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Resume Module</Button>
      </CardFooter>
    </Card>
  );
}
