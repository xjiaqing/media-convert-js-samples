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
        Queue: "<your-media-convert-queue-arn-here>",
        Role: "<your-media-convert-execution-role-arn-here>",
        Settings: {
            TimecodeConfig: { Source: "ZEROBASED" },
            FollowSource: 1,
            Inputs: [
                {
                    TimecodeSource: "ZEROBASED",
                    AudioSelectors: {
                        dialogue: {
                            ExternalAudioFileInput:
                                "<your-external-input-audio-file-s3-file-here>",
                        },
                        effect: {
                            ExternalAudioFileInput:
                                "<your-external-input-audio-file-s3-file-here>",
                        },
                        bgm: {
                            ExternalAudioFileInput:
                                "<your-external-input-audio-file-s3-file-here>",
                        },
                    },
                    AudioSelectorGroups: {
                        audio: {
                            AudioSelectorNames: ["dialogue", "effect", "bgm"],
                        },
                    },
                    CaptionSelectors: {
                        caption: {
                            SourceSettings: {
                                SourceType: "TTML",
                                FileSourceSettings: {
                                    SourceFile: "<your-caption-s3-file-here",
                                },
                            },
                        },
                    },
                    FileInput: "<your-input-video-s3-file-here>",
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
                                            YPosition: 420,
                                            Alignment: "CENTERED",
                                            StylePassthrough: "ENABLED",
                                            FontFileRegular:
                                                "<your-caption-font-file-s3-file>",
                                            FontFileBold:
                                                "<your-caption-font-file-s3-file>",
                                            FontFileItalic:
                                                "<your-caption-font-file-s3-file>",
                                            FontFileBoldItalic:
                                                "<your-caption-font-file-s3-file>",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    OutputGroupSettings: {
                        Type: "FILE_GROUP_SETTINGS",
                        FileGroupSettings: {
                            Destination: "<your-output-file-s3-prefix-here>",
                        },
                    },
                },
            ],
        },
    }),
);

response.then((res) => console.log(res));
