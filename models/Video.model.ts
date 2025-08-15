import mongoose from "mongoose";

export interface Video {
    _id?:mongoose.Types.ObjectId;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    controls: boolean;
    transformations:{
        width?:number;
        height?:number;
        quality?:number;
    }
}

const VideoSchema = new mongoose.Schema<Video>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, required: true },
    transformations: {
        width: { type: Number },
        height: { type: Number },
        quality: { type: Number }
    }
});

const Video = mongoose.models?.VideoSchema || mongoose.model<Video>("Video", VideoSchema);

export default Video;
