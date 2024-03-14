import { media } from '@wix/sdk';
import { useMemo } from 'react';
import { ImageTransformOptions } from '@wix/image-kit';
const defualtBreaks = [1200, 800, 600, 400, 200];
export const useWixImageSet = (url: string, breaks: number[] = defualtBreaks, useMin = true) => {
    const res = useMemo(() => {
        return calcMediaSet(url, breaks, useMin);
    }, [url, breaks, useMin]);
    return res;
};
const defaultTransformOptions: ImageTransformOptions = {};
export const calcMediaSet = (url?: string, breaks: number[] = defualtBreaks, useMin = true) => {
    if (!url) return { src: url, sizes: '', srcSet: '' };

    if (!url.startsWith('wix:')) {
        return { src: url, sizes: '', srcSet: '' };
    }
    const srcSet = breaks
        .map(
            (width) =>
                `${media.getScaledToFillImageUrl(
                    url,
                    width,
                    width,
                    defaultTransformOptions
                )} ${width}w`
        )
        .join(', ');
    const sizes = breaks
        .map((width) => (useMin ? `(min-width: ${width}px)` : `(max-width: ${width}px)`))
        .join(', ');
    const src = useMin
        ? media.getScaledToFillImageUrl(url, breaks[0], breaks[0], defaultTransformOptions)
        : url;
    return {
        src,
        sizes,
        srcSet,
    };
};
