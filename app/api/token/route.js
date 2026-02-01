import { StreamClient } from "@stream-io/node-sdk";
import { role } from "@stream-io/video-react-sdk";

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY




export async function POST(request) {
    try {
        const {userId} = request.json();
        if(!apiKey || !apiSecret){
            return Response.json(
                {
                    error:"Missing API credential"
                },{
                    status:500
                }
            );
        }
        const serverClient = new StreamClient(apiKey, apiSecret);
        const newUser = {
            id:userId,
            role:"admin",
            name:userId,
        };

        await serverClient.upsertUsers(newUser);

        const validity = 60 * 60 * 24 ; // 24 hour
        const token = serverClient.generateUserToken(
            {
                user_id:userId,
                validity_in_seconds:validity,
            }
        );
        return Response.json({token});
    } catch (error) {
        console.error("Token generation error:", error);
        return Response.json(
            {
                error:"Token generation failed"
            },{
                status:500
            }
        );
        
    }
}