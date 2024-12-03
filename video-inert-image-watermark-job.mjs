import { CreateJobCommand, MediaConvert } from "@aws-sdk/client-mediaconvert";

const c = new MediaConvert({ region: "us-east-1" });
const response = c.send(new CreateJobCommand({
    Queue: "<your-media-convert-queue-arn-here>",
    Role: "<your-media-convert-execution-role-here>",
    Settings: {
        FollowSource: 1,
        TimecodeConfig: { Source: "ZEROBASED" },
        Inputs: [
            {
                FileInput: "<your-input-video-s3-file-here>",
                AudioSelectors: {
                    Default: { DefaultSelection: "DEFAULT" }
                },
            }
        ],
        OutputGroups: [
            {
                Name: "watermark-lab",
                OutputGroupSettings: {
                    Type: "FILE_GROUP_SETTINGS",
                    FileGroupSettings: {
                        Destination: "<your-output-video-s3-prefix-here>"
                    }
                },
                Outputs: [
                    {
                        NameModifier: "-watermark-script",
                        ContainerSettings: { Container: "MP4" },
                        AudioDescriptions: [{
                            AudioSourceName: "Default",
                            CodecSettings: {
                                Codec: "AAC",
                                AacSettings: {
                                    Bitrate: 256000,
                                    CodingMode: "CODING_MODE_2_0",
                                    SampleRate: 48000,
                                },
                            },
                        }],
                        VideoDescription: {
                            CodecSettings: {
                                Codec: "H_264",
                                H264Settings: {
                                    MaxBitrate: 3500000,
                                    RateControlMode: "QVBR",
                                },
                            },
                            VideoPreprocessors: {
                                ImageInserter: {
                                    InsertableImages: [
                                        {
                                            Width: 205,
                                            Height: 60,
                                            ImageX: 10,
                                            ImageY: 20,
                                            Layer: 99,
                                            ImageInserterInput: "<your-watermark-image-s3-file-here>",
                                            StartTime: "00:00:00:00",
                                            Opacity: 100
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}))


response.then((res) => console.log(res));