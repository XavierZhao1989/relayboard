import { Suspense, type ReactNode } from "react";
import { Shell } from "@/components/workspace/shell";
import { WorkspaceProvider } from "@/components/workspace/provider";

export default function AfterLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <Suspense fallback={<div className="min-h-dvh bg-background" />}>
        <Shell>{children}</Shell>
      </Suspense>
    </WorkspaceProvider>
  );
}
