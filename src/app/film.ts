export class Film {
    id: string;
    moviename: string;
    category: string;
    stars: number;
    image: string;
    opmerkingen: string[];
    beschrijving: string;

    constructor() {
        this.id= '';
        this.moviename = '';
        this.stars = 0;
        this.image = '';
        this.opmerkingen = [];
        this.category = '';
        this.beschrijving = '';
    }
}
export class Administrator {
    id: string;
    name: string;
    rights: string;


    constructor() {
        this.id = '';
        this.name='';
        this.rights='';
    }
}