export interface ParagraphProps {
    title: string;
    image: string;
    content: string;
}

export const Paragraph = (props: ParagraphProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <img src={props.image} alt={props.title} />
            <p>{props.content}</p>
        </div>
    );
};
