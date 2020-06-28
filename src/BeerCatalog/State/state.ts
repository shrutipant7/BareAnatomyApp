export interface CatalogState {
    name: string;
    beerInfo: BeerState[];
    favBeerList: BeerState[];
    favBeerInfo: BeerState;
}

export interface BeerState {
    id: number;
    name: string;
    tagline: string;
    image_url: string;
    description: string;
}

export default function defaultCatalogState(): CatalogState {
    return (
        {
            name: '',
            beerInfo: [],
            favBeerList: [],
            favBeerInfo: {
                id: -1,
                name: '',
                tagline: '',
                image_url: '',
                description: ''
            }
        }
    );
}