import { TrackOrderClient } from "@/components/TrackOrderClient";

export default function TrackOrderPage({ searchParams }: { searchParams: { order?: string } }) {
  return <TrackOrderClient initialOrder={searchParams.order || ""} />;
}
