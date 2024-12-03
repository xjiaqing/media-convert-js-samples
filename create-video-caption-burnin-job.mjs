// wiki： https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/mediaconvert/command/CreateJobCommand/
//
// 视频合成 （视频字幕 + 声音 + 音效 + 视频)
//

import {
    CreateJobCommand,
    MediaConvertClient,
} from "@aws-sdk/client-mediaconvert";

const c = new MediaConvertClient({ region: "us-east-1" });
const response = c.send(
    new CreateJobCommand({
        Queue: "<your-media-convert-queue-here>",
        Role: "<your-media-convert-execution-role-here>",
        Settings: {
            TimecodeConfig: { Source: "ZEROBASED" },
            FollowSource: 1,
            Inputs: [
                {
                    TimecodeSource: "ZEROBASED",
                    AudioSelectors: { audio: { DefaultSelection: "DEFAULT" } },
                    CaptionSelectors: {
                        caption: {
                            SourceSettings: {
                                SourceType: "TTML",
                                FileSourceSettings: {
                                    SourceFile: "<your-caption-s3-file-here>",
                                },
                            },
                        },
                    },
                    FileInput: "<your-input-video-file-s3-file-here>",
                },
            ],
            OutputGroups: [
                {
                    Name: "File Group",
                    Outputs: [
                        {
                            ContainerSettings: { Container: "MP4" },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 6000000,
                                        RateControlMode: "QVBR",
                                        QvbrSettings: { QvbrQualityLevel: 8 },
                                    },
                                },
                            },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "audio",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 96000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            CaptionDescriptions: [
                                {
                                    CaptionSelectorName: "caption",
                                    DestinationSettings: {
                                        DestinationType: "BURN_IN",
                                        BurninDestinationSettings: {
                                            YPosition: 380,
                                            Alignment: "CENTERED",
                                            StylePassthrough: "ENABLED",
                                            // FontSize: 16,
                                            // FontColor: "WHITE",
                                            // OutlineColor: "BLACK",
                                            // OutlineSize: 3,
                                            FontFileRegular:
                                                "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/AmazonEmber_Rg.ttf",
                                            FontFileBold:
                                                "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/AmazonEmber_Bd.ttf",
                                            FontFileItalic:
                                                "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/AmazonEmber_RgIt.ttf",
                                            FontFileBoldItalic:
                                                "s3://xjiaqing-iad-lab/media-convert/deep-blue/video-composition/ttf/AmazonEmber_BdIt.ttf",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    OutputGroupSettings: {
                        Type: "FILE_GROUP_SETTINGS",
                        FileGroupSettings: {
                            Destination:
                                "<your-output-video-file-s3-prefix-here>",
                        },
                    },
                },
            ],
        },
    }),
);

response.then((res) => console.log(res));
