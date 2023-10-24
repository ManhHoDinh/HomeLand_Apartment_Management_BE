import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";

export interface ValidateFileOption {
    name: string;
    mimetypes?: string[];
    limit?: number;
}

/**
 * Custom file validation pipe
 * @constructor validateOption
 */
@Injectable()
export class ValidateFilePipe implements PipeTransform {
    constructor(private readonly fileOptions: ValidateFileOption[]) {}
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) throw new BadRequestException("No file found");
        this.fileOptions.forEach((option) => {
            const { name, mimetypes, limit } = option;
            if (!value[name])
                throw new BadRequestException(name + " is not found");
            if (limit) {
                value[name].forEach((file) => {
                    if (file.size > limit)
                        throw new BadRequestException(
                            name + " size must not exceed " + limit + " bytes",
                        );
                });
            }
            if (mimetypes) {
                value[name].forEach((file) => {
                    if (!mimetypes.includes(file.mimetype))
                        throw new BadRequestException(
                            `'${name}' MIME must be one of ${mimetypes.join(
                                ", ",
                            )}`,
                        );
                });
            }
        });
        return value;
    }
}

const commonImageMIMETypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/tiff",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/vnd.wap.wbmp",
    "image/x-xbitmap",
    "image/x-xpixmap",
    "image/x-xwindowdump",
];
export class ValidateImageOption {
    name: string;
    limit?: number;
    mimetypes?: string[] = commonImageMIMETypes;
}
/**
 * Custom file validation pipe
 * @constructor ValidateImageOption
 */
@Injectable()
export class ValidateImagePipe extends ValidateFilePipe {
    constructor(private readonly imagesOption: ValidateImageOption[]) {
        super(imagesOption);
    }
}
