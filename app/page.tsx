// page.tsx
'use client'

import { Suspense } from "react";
import HomePage from "./home-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}