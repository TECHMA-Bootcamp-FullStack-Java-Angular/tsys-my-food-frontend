import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { LogoComponent } from '../../shared/logo/logo.component';
import { TokenStorageService } from '../../services/token-storage.service';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    LogoComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

  servToker = inject(TokenStorageService)
  constructor(private router: Router , private renderer: Renderer2, private el: ElementRef) { }

  logOut() {
    this.servToker.singOut();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (window.innerWidth <= 767) {
      this.mostrarMensaje();
    }
  }

  mostrarMensaje() {

    const msg = this.renderer.createElement('div');
    this.renderer.addClass(msg, 'mensaje-movil');
    const text = this.renderer.createText(`⚠️ AVISO: Le recordamos el panel de administrador debe ser visto en formato browser.`);
    this.renderer.appendChild(msg, text);
    this.renderer.appendChild(this.el.nativeElement.ownerDocument.body, msg);
  }

}
