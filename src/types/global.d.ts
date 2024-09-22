import { YouTubePlayer } from "react-youtube";

declare module "react-youtube" {
    interface YouTubePlayer {
        playerInfo: {
            videoData: {
                video_id: string;
            }
        }
    }
}