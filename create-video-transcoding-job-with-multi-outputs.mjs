import { CreateJobCommand, MediaConvert } from "@aws-sdk/client-mediaconvert";

const c = new MediaConvert({ region: "us-east-1" });
const response = c.send(
    new CreateJobCommand({
        Queue: "<your-mediaconvert-queue-here>",
        Role: "<your-mediaconvert-execution-role-here>",
        Settings: {
            FollowSource: 1,
            Inputs: [
                {
                    FileInput: "<your-input-file-here>",
                    AudioSelectors: {
                        Default: { DefaultSelection: "DEFAULT" },
                    },
                },
            ],
            OutputGroups: [
                {
                    Name: "480p",
                    OutputGroupSettings: {
                        Type: "FILE_GROUP_SETTINGS",
                        FileGroupSettings: {
                            Destination: "<480p-output-here>",
                        },
                    },
                    Outputs: [
                        {
                            NameModifier: "-ts-480p-0_82Bits",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 480,
                                Height: 854,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 820000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                        {
                            NameModifier: "ts-480p-0_72Bits",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 480,
                                Height: 854,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 720000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                        {
                            NameModifier: "-ts-480p-0_64Bits",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 480,
                                Height: 854,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 640000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                        {
                            NameModifier: "-ts-480p-0_54Bits",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 480,
                                Height: 854,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 540000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    Name: "720p",
                    OutputGroupSettings: {
                        Type: "FILE_GROUP_SETTINGS",
                        FileGroupSettings: {
                            Destination: "<720p-output-here>",
                        },
                    },
                    Outputs: [
                        {
                            NameModifier: "-ts-720p",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 720,
                                Height: 1280,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 820000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    Name: "1080p",
                    OutputGroupSettings: {
                        Type: "FILE_GROUP_SETTINGS",
                        FileGroupSettings: {
                            Destination: "<1080p-output-here>",
                        },
                    },
                    Outputs: [
                        {
                            NameModifier: "-ts-1080p",
                            ContainerSettings: { Container: "MP4" },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Default",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 256000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            VideoDescription: {
                                Width: 1080,
                                Height: 1920,
                                VideoPreprocessors: {
                                    ColorCorrector: {
                                        Brightness: 52,
                                        Contrast: 52,
                                    },
                                },
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 820000,
                                        RateControlMode: "QVBR",
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    }),
);

response.then((res) => console.log(res));
