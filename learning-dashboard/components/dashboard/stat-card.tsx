import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  delta: string;
  description: string;
};

export function StatCard({ title, value, delta, description }: StatCardProps) {
  return (
    <Card className="animate-slide-fade">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            {delta}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-display text-4xl font-bold">{value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
