import { Card } from "@mantine/core";
import type { CSSProperties, ReactNode } from "react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";

type DashboardCardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export function DashboardCard({ children, style }: DashboardCardProps) {
  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%", ...style }}>
      {children}
    </Card>
  );
}
