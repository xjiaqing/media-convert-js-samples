// wiki： https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/mediaconvert/command/CreateJobCommand/
//
// 视频压缩和抽帧
//
import { CreateJobCommand, MediaConvertClient } from "@aws-sdk/client-mediaconvert";

const c = new MediaConvertClient({ region: 'us-east-1' })
const response = c.send(new CreateJobCommand({
    JobTemplate: 'xjiaqing-mc-job-1',
    Queue: 'arn:aws:mediaconvert:us-east-1:867533378352:queues/Default',
    Role: 'arn:aws:iam::867533378352:role/service-role/MediaConvert_Default_Role',
    Settings: {
        FollowSource: 1,
        Inputs: [
            {
                FileInput: 's3://xjiaqing-iad-lab/media-convert/soul-sample/20240822-162447.mp4',
                VideoSelector: { Rotate: "AUTO" }
            },
        ],
        OutputGroups: [{
            OutputGroupSettings: { FileGroupSettings: { Destination: 's3://xjiaqing-iad-lab/media-convert/soul-sample/20240822-162447-output' } },
            Outputs: [{
                VideoDescription: {
                    CodecSettings: {
                        H264Settings: {
                            MaxBitrate: 15728640,
                            HrdBufferSize: 1000000,
                            QvbrSettings: { QvbrQualityLevel: 7 }
                        }
                    }
                }
            },
            // 转码的时候截视频首帧
            {
                ContainerSettings: { "Container": "RAW" },
                VideoDescription: {
                    CodecSettings: {
                        Codec: "FRAME_CAPTURE",
                        FrameCaptureSettings: { FramerateDenominator: 3, FramerateNumerator: 1, MaxCaptures: 1 }
                    }
                },
                Extension: "jpeg"
            }]
        }]
    }
}))

response.then(res => console.log(res))
