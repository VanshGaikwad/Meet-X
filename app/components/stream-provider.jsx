const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export default function StreamProvider({children,user,token}) {
    useStreamClients({apiKey,user,token});
}