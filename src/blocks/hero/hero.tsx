export interface HeroProps {
    title: string;
    text: string;
    /** @format image-url */
    image?: string;
}

export const Hero = (props: HeroProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <img src={props.image} alt={props.title} />
        </div>
    );
};
