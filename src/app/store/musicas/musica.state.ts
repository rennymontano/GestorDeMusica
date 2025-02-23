
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store"
import { Song } from "src/app/models/song";
import { MusicaActions } from "./musica.actions";
import { MusicaService } from "@services/musica.service";
import { plainToInstance } from "class-transformer";
import { Artist } from "src/app/models/artist";
import { Company } from "src/app/models/company";



export class MusicaStateModel {
    public canciones: Song[];
    public artistas: Artist[];
    public companias: Company[];
    public isLoadCanciones: boolean;
}

const defaults = {
    canciones: [],
    artistas: [],
    companias: [],
    isLoadCanciones: false
}

@State<MusicaStateModel>({
    name: 'canciones',
    defaults
})

@Injectable()
export class MusicaState {
    constructor(private musicaService: MusicaService){}

    @Selector()
    static canciones(state: MusicaStateModel): Song[] {
        return state.canciones;
    }

    @Selector()
    static artistas(state: MusicaStateModel): Artist[] {
        return state.artistas;
    }

    @Selector()
    static companias(state: MusicaStateModel): Company[] {
        return state.companias;
    }

    @Selector()
    static isLoadCanciones(state: MusicaStateModel): boolean {
        return state.isLoadCanciones;
    }

    @Action(MusicaActions.Refresh)
    refresh(ctx: StateContext<MusicaStateModel>, {}: MusicaActions.Refresh) {
        ctx.dispatch(new MusicaActions.Canciones);
        ctx.dispatch(new MusicaActions.Artistas);
        ctx.dispatch(new MusicaActions.Companias);
    }

    @Action(MusicaActions.Canciones)
    getCanciones(ctx: StateContext<MusicaStateModel>, {}: MusicaActions.Canciones) {
        ctx.patchState({isLoadCanciones: false })
        this.musicaService.getSongs().subscribe({
            next: (res) => {
                ctx.dispatch(new MusicaActions.CancionesSuccess(res));
            },
            error: (e)=> {
                console.error(e);
                ctx.patchState({isLoadCanciones: true })
            }
        })
    }

    @Action(MusicaActions.CancionesSuccess)
    getCancionesSuccess(ctx: StateContext<MusicaStateModel>, {canciones}: MusicaActions.CancionesSuccess) {
        ctx.patchState({
            canciones: plainToInstance(Song, canciones),
            isLoadCanciones: true
        })
    }

    @Action(MusicaActions.Artistas)
    gettArtistas(ctx: StateContext<MusicaStateModel>, {}: MusicaActions.Artistas) {
        this.musicaService.getArtists().subscribe({
            next: (res) => {
                ctx.dispatch(new MusicaActions.ArtistasSuccess(res));
            },
            error: (e)=> {
                console.error(e)
            }
        })
    }

    @Action(MusicaActions.ArtistasSuccess)
    getArtistasSuccess(ctx: StateContext<MusicaStateModel>, {artistas}: MusicaActions.ArtistasSuccess) {
        ctx.patchState({
            artistas: plainToInstance(Artist, artistas)
        })
    }

    @Action(MusicaActions.Companias)
    getCompanias(ctx: StateContext<MusicaStateModel>, {}: MusicaActions.Companias) {
        this.musicaService.getCompanies().subscribe({
            next: (res) => {
                ctx.dispatch(new MusicaActions.CompaniasSuccess(res));
            },
            error: (e)=> {
                console.error(e)
            }
        })
    }

    @Action(MusicaActions.CompaniasSuccess)
    getCompaniasSuccess(ctx: StateContext<MusicaStateModel>, {companias}: MusicaActions.CompaniasSuccess) {
        ctx.patchState({
            companias: plainToInstance(Company, companias)
        })
    }
}