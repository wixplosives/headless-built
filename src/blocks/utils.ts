import { STATIC_WIX_MEDIA_ROOT } from './constants';

export const processImageUrl = (url: string, width = 640, height = 640) => {
    const uri = url.split('/')[3];
    const extension = uri.split('.').pop();
    const imageUrl = `${STATIC_WIX_MEDIA_ROOT}${uri}/v1/fit/w_${width},h_${height}/file.${extension}`;

    return imageUrl;
};
