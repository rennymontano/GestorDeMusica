import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCustomModule } from './modules/mat-custom/mat-custom.module';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '@services/drawer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCustomModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;  
  isDrawerOpened = false;  

  constructor(private drawerService: DrawerService) {}

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }

  closeDrawer(): void {
    this.drawerService.closeDrawer();
  }
}
