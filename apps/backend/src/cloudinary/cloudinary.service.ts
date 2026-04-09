import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('Cloudinary') private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadPDFs(
    files: Express.Multer.File[],
    currUserID: string,
    conversationID: string,
  ): Promise<string[]> {
    const URLs: string[] = [];

    for (const file of files) {
      const DOCUMENT_NAME =
        `${currUserID}_${file.originalname.split('.')[0]}`.replace(/\s+/g, '-');
      const FOLDER_NAME = `user-${currUserID}_PDF_Uploads/conversation-${conversationID}`;

      const uploadResult: any = await new Promise((resolve) => {
        Cloudinary.uploader
          .upload_stream(
            { public_id: DOCUMENT_NAME, folder: FOLDER_NAME },
            (error, result) => {
              if (error) return error;
              resolve(result);
            },
          )
          .end(file.buffer);
      });

      URLs.push(uploadResult.secure_url as string);
    }

    return URLs;
  }
}
