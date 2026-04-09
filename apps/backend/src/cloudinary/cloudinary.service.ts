import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('Cloudinary') private readonly cloudinary: typeof Cloudinary,
  ) {}

  uploadPDFs(
    files: Express.Multer.File[],
    currUserID: string,
    conversationID: string,
  ) {
    for (const file of files) {
      const DOCUMENT_NAME =
        `${currUserID}_${file.originalname.split('.')[0]}`.replace(/\s+/g, '-');
      const FOLDER_NAME = `user-${currUserID}_PDF_Uploads/conversation-${conversationID}`;

      new Promise((resolve) => {
        Cloudinary.uploader
          .upload_stream(
            { public_id: DOCUMENT_NAME, folder: FOLDER_NAME },
            (error, uploadResult) => {
              if (error) {
                return error;
              }

              return resolve(uploadResult);
            },
          )
          .end(file.buffer);
      })
        .then((uploadResult: any) => {
          console.log(uploadResult.secure_url);
          return uploadResult.secure_url;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
