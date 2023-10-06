export class Film {
    id: number;
    moviename: string;
    category: string;
    stars: number;
    image: string;
    opmerkingen: string[];
    beschrijving: string;

    constructor() {
        this.id= 0;
        this.moviename = '';
        this.stars = 0;
        this.image = '';
        this.opmerkingen = [];
        this.category = '';
        this.beschrijving = '';
    }
}
