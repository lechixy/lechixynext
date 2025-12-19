import type { NextApiRequest, NextApiResponse } from 'next'
import { VideoInfo, YtDlp } from 'ytdlp-nodejs';

const ytDlp = new YtDlp({
    binaryPath: `${process.cwd()}/ytdlp.exe`,
    ffmpegPath: ``,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            code: 405,
            message: "Method Not Allowed"
        });
    }

    const link = req.query?.url as string;

    if (!link) {
        return res.status(400).json({
            code: 400,
            message: "Missing 'url' query parameter."
        });
    }

    try {
        const info = await ytDlp.getInfoAsync(link) as VideoInfo;

        // metadata içinden gerçek dosya adını al
        const filename = `${info.uploader}_${info.id}.${info.ext}` || "video.mp4";

        // Download olması için header ayarla
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

        const stream = ytDlp.stream(link);

        stream.pipe(res);

    } catch (err: any) {
        res.status(500).json({
            code: 500,
            error: err.message || "Unknown error"
        });
    }
}
