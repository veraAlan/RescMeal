declare module '@mapbox/search-js-react' {
    import { ForwardRefExoticComponent, RefAttributes } from 'react';

    export interface SearchBoxProps {
        accessToken: string;
        map: any; 
        mapboxgl: any; 
        value: string;
        onChange: (value: string) => void;
        marker?: boolean; 

    }

    export const SearchBox: ForwardRefExoticComponent<SearchBoxProps & RefAttributes<unknown>>;
}