"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getViewersByLinkIdAction } from "@/actions/links";
import { Link } from "@/types/links";
import { toast } from "sonner";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  linux: {
    label: "Linux",
    color: "hsl(var(--chart-1))",
  },
  windows: {
    label: "Windows",
    color: "hsl(var(--chart-2))",
  },
  ios: {
    label: "IOS",
    color: "hsl(var(--chart-3))",
  },
  android: {
    label: "Android",
    color: "hsl(var(--chart-4))",
  },
  unknown: {
    label: "Unknown",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PlatformChart() {
  const selectedLink = useSelector(
    (state: RootState) => state.link.selectedLink,
  );
  const [viewersData, setViewersData] = useState<Link[]>([]);
  // const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchViewers = async () => {
      if (!selectedLink)
        return toast("No Link is selected", {
          description: "Please select a link from the dropdown menu",
        });

      // setIsPending(true);
      const viewers = await getViewersByLinkIdAction(selectedLink?.$id);
      // group viewers by device
      const chartData = new Map();
      for (const item of viewers) {
        const device = item.device;
        if (chartData.has(device)) {
          chartData.get(device).count += 1;
        } else {
          chartData.set(device, {
            device,
            count: 1,
            fill: `var(--color-${device.toLowerCase()})`,
          });
        }
      }
      setViewersData(Array.from(chartData.values()));
      // setIsPending(false);
    };

    fetchViewers();
  }, [selectedLink]);

  // if (isPending) return <Card className="h-[250px]" />;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Clicks by platform</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {viewersData.length ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={viewersData}
                dataKey="count"
                nameKey="device"
                innerRadius={60}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {viewersData.length}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="h-[250px] flex justify-center items-center text-2xl text-gray-500">
            No Data to display
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors
        </div>
      </CardFooter>
    </Card>
  );
}
