import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoCardComponent } from '../../../shared/logo-card/logo-card.component';
import { User } from '../../../models/user';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink,LogoCardComponent],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  username:string = 'Manel Castellví';
}
