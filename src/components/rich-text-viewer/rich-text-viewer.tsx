import classes from './rich-text-viewer.module.scss';
import classNames from 'classnames';
export interface RichTextViewerProps {
    /** @format html */
    text: string;
    className?: string;
}

export const RichTextViewer = (props: RichTextViewerProps) => {
    return (
        <span
            className={classNames(props.className, classes.richtextRoot)}
            dangerouslySetInnerHTML={{
                __html: props.text,
            }}
        />
    );
};
