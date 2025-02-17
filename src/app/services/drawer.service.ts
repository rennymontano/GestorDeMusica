import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawer!: MatDrawer; 
  private drawerStateSubject = new BehaviorSubject<boolean>(false);  
  drawerState$ = this.drawerStateSubject.asObservable(); 

  setDrawer(drawer: MatDrawer): void {
    this.drawer = drawer;
  }

 
  openDrawer(): void {
    this.drawer.open();
    this.drawerStateSubject.next(true);  
  }


  closeDrawer(): void {
    this.drawer.close();
    this.drawerStateSubject.next(false);  
  }

  
  toggleDrawer(): void {
    if (this.drawer) {
      if (this.drawer.opened) {
        this.closeDrawer();
      } else {
        this.openDrawer();
      }
    }
  }
}
