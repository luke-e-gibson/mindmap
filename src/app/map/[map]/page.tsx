import MapPageClient from "./client";

export default async function Map({
  params,
}: {
  params: Promise<{ map: string }>;
}) {
  const document = (await params).map;

  return <MapPageClient page={document} />;
}
