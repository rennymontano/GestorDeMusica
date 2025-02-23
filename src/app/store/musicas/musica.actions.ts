import { Song } from "src/app/models/song";
import { logDispatcher } from "../state.decorators";
import { Artist } from "src/app/models/artist";
import { Company } from "src/app/models/company";

export namespace MusicaActions {

    @logDispatcher
    export class Refresh {
        static readonly type = '[Musica] Refresh'
        constructor() {}
    }

    @logDispatcher
    export class Canciones {
        static readonly type = '[Musica] Canciones'
        constructor() {}
    }

    @logDispatcher
    export class CancionesSuccess {
        static readonly type = '[Musica] CancionesSuccess'
        constructor(public canciones: Song[]) {}
    }

    @logDispatcher
    export class Artistas {
        static readonly type = '[Musica] Artistas'
        constructor() {}
    }

    @logDispatcher
    export class ArtistasSuccess {
        static readonly type = '[Musica] ArtistasSuccess'
        constructor(public artistas: Artist[]) {}
    }

    @logDispatcher
    export class Companias {
        static readonly type = '[Musica] Companias'
        constructor() {}
    }

    @logDispatcher
    export class CompaniasSuccess {
        static readonly type = '[Musica] CompaniasSuccess'
        constructor(public companias: Company[]) {}
    }
}