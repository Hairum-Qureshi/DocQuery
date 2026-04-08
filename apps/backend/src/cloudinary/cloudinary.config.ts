import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const CLOUD_NAME = configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const API_KEY = configService.get<string>('CLOUDINARY_API_KEY');
    const API_SECRET = configService.get<string>('CLOUDINARY_API_SECRET');

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      throw new Error('Cloudinary config missing!');
    }

    return v2.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  },
};
