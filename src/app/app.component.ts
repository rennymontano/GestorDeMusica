import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatCustomModule } from './modules/mat-custom/mat-custom.module';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '@services/drawer.service';
import { Store } from '@ngxs/store';
import { MusicaActions } from './store/musicas/musica.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCustomModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;  
  isDrawerOpened = false;  

  constructor(private drawerService: DrawerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadState();
  }

  loadState() {
    this.store.dispatch(new MusicaActions.Canciones());
    this.store.dispatch(new MusicaActions.Artistas());
    this.store.dispatch(new MusicaActions.Companias());
  }

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }

  closeDrawer(): void {
    this.drawerService.closeDrawer();
  }

  onItemClick(route: string) {
    console.log(`Ruta seleccionada: ${route}`);
  }
}
