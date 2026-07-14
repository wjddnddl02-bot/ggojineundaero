"use client";

import dynamic from "next/dynamic";
import type { Destination } from "@/types/destination";

const RandomTripApp = dynamic(() => import("@/components/RandomTripApp"), {
  ssr: false,
});

interface RandomTripAppClientProps {
  sharedDestination?: Destination | null;
}

export default function RandomTripAppClient({
  sharedDestination = null,
}: RandomTripAppClientProps) {
  return <RandomTripApp sharedDestination={sharedDestination} />;
}
