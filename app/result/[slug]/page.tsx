import { redirect } from "next/navigation";
import type { Metadata } from "next";
import RandomTripAppClient from "@/components/RandomTripAppClient";
import { getDestinationBySlug } from "@/data/destinations";
import { SERVICE_NAME } from "@/lib/constants";

interface ResultPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: `${SERVICE_NAME} | 대한민국 랜덤 여행` };
  }

  const title = `내 랜덤 여행지는 ${destination.city} | ${SERVICE_NAME}`;
  return {
    title,
    openGraph: { title, type: "website" },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    redirect("/");
  }

  return <RandomTripAppClient sharedDestination={destination} />;
}
