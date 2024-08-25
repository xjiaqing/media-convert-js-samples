// wiki： https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/mediaconvert/command/CreateJobCommand/
//
// 视频合成 （视频字幕 + 声音 + 音效 + 视频)
//

import { CreateJobCommand, MediaConvertClient } from "@aws-sdk/client-mediaconvert";
import { format } from "date-fns";

const c = new MediaConvertClient({ region: 'us-east-1' })
const response = c.send(new CreateJobCommand({
    Queue: 'arn:aws:mediaconvert:us-east-1:867533378352:queues/Default',
    Role: 'arn:aws:iam::867533378352:role/service-role/MediaConvert_Default_Role',
    Settings: {
        TimecodeConfig: { Source: "ZEROBASED" },
        FollowSource: 1,
        Inputs: [{
            TimecodeSource: "ZEROBASED",
            AudioSelectors: {
                "dialogue": {
                    ExternalAudioFileInput: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/dialogue.wav"
                },
                "effect": {
                    ExternalAudioFileInput: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/sound-effect.wav"
                },
                "bgm": {
                    ExternalAudioFileInput: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/bgm.wav"
                }
            },
            AudioSelectorGroups: {
                "audio": { AudioSelectorNames: ["dialogue", "effect", "bgm"] }
            },
            CaptionSelectors: {
                "caption": {
                    SourceSettings: { SourceType: "TTML", FileSourceSettings: { SourceFile: 's3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/subtitle-new.ttml' } }
                }
            },
            FileInput: 's3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/source-video.mp4'
        }],
        OutputGroups: [{
            Name: "File Group",
            Outputs: [{
                ContainerSettings: { Container: "MP4" },
                VideoDescription: {
                    CodecSettings: {
                        Codec: "H_264",
                        H264Settings: { MaxBitrate: 6000000, RateControlMode: "QVBR" }
                    }
                },
                AudioDescriptions: [{
                    AudioSourceName: "audio",
                    CodecSettings: { Codec: "AAC", AacSettings: { Bitrate: 96000, CodingMode: "CODING_MODE_2_0", SampleRate: 48000 } }
                }],
                CaptionDescriptions: [{
                    CaptionSelectorName: 'caption',
                    DestinationSettings: {
                        DestinationType: "BURN_IN",
                        BurninDestinationSettings: {
                            YPosition: 420,
                            Alignment: "CENTERED",
                            StylePassthrough: "ENABLED",
                            FontFileRegular: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/FiraCode-Regular.ttf",
                            FontFileBold: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/FiraCode-Bold.ttf",
                            FontFileItalic: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/FiraCode-Regular.ttf",
                            FontFileBoldItalic: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/FiraCode-Bold.ttf"
                        }
                    }
                }]
            }],
            OutputGroupSettings: {
                Type: "FILE_GROUP_SETTINGS",
                FileGroupSettings: { Destination: "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/video-" + format(new Date(), "yyyy-MM-dd-HH-mm-ss") }
            }
        }]
    }
}))

response.then(res => console.log(res))