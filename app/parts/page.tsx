import { Suspense } from "react";
import PartsPageContent from "./PartsPageContent";

export default function PartsPage() {
  return (
    <Suspense fallback={<div>Loading parts...</div>}>
      <PartsPageContent />
    </Suspense>
  );
}
