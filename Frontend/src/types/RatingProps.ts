declare module 'react-rating-stars-component' {
    import * as React from 'react';

    export interface RatingProps {
        count?: number;
        value?: number;
        onChange?: (value: number) => void;
        size?: number;
        isHalf?: boolean;
        emptyIcon?: React.ReactElement;
        halfIcon?: React.ReactElement;
        filledIcon?: React.ReactElement;
        activeColor?: string;
    }

    const Rating: React.FC<RatingProps>;
    export default Rating;
}
