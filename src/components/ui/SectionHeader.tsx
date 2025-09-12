import { Title } from "./title";

interface SectionHeaderProps {
    subTitle: string;
    left?: boolean;
    right?: boolean;
    center?: boolean;
    margin?: boolean;
    title?: string;
    smallTitle?: string;
    centerText?: boolean;
}

export const SectionHeader = ({
    subTitle,
    left = false,
    right = false,
    center = false,
    margin = false,
    title,
    smallTitle,
    centerText = false,
}: SectionHeaderProps) => {
    return (
        <div className="my-6 lg:mb-8 lg:mt-0">
            <Title
                title={title}
                subTitle={subTitle}
                left={left}
                right={right}
                center={center}
                margin={margin}
                smallTitle={smallTitle}
                centerText={centerText}
            />
        </div>
    );
};
