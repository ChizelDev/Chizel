import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | d2cora: Real Results for Real Businesses",
  description: "See how d2cora drives measurable growth for businesses. Real campaigns, real numbers, real proof.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
