import { media } from '@wix/sdk';
import { RichTextViewer } from '../../components/rich-text-viewer/rich-text-viewer';
import { calcMediaSet, useWixImageSet } from '../../hooks/use-wix-image-set';

export interface HeroProps {
    title: string;
    text: string;
    image: string;
    url: string;
    tags: string[];
    richcontent: any;
}

export const Hero = (props: HeroProps) => {
    const imageSet = calcMediaSet(props.image);
    return (
        <div>
            <h1>{props.title}</h1>
            <RichTextViewer text={props.text} />
            <img alt={props.title} {...calcMediaSet(props.image)} />
            {props.url}
        </div>
    );
};
