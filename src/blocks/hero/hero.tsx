import { media } from '@wix/sdk';
import { RichTextViewer } from '../../components/rich-text-viewer/rich-text-viewer';
import { calcMediaSet, useWixImageSet } from '../../hooks/use-wix-image-set';
import RichContentViewer from '../../components/rico-viewer/rico-viewer';
import { toDraft } from 'ricos-content/libs/toDraft';

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
    const img = calcMediaSet(props.image, [10, 20, 50, 300, 460], true);
    return (
        <div>
            <pre>{JSON.stringify(img, null, 4)}</pre>
            <h1>{props.title}</h1>
            <RichTextViewer text={props.text} />
            <img {...img} />
            {props.url}
            {props.richcontent ? <RichContentViewer content={toDraft(props.richcontent)} /> : null}
        </div>
    );
};
