import MapPageClient from "./client";

export default async function Map({ params }: { params: Promise<{map: string}> }) {
    const document = (await params).map
    
    if(document === "new") {
        return <MapPageClient />
    } else {
        return <h1> Not implemented </h1>
    }

}