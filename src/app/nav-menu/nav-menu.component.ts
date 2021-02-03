import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  constructor( private auth: AuthService, private tokenstorage:TokenStorageService, private router:Router) {}


  logout(){
    let user=JSON.parse(this.tokenstorage.getUser());
    let role={role: user.role};
    console.log(role);
    console.log(user);
    window.sessionStorage.clear();
    this.auth.logout(role, user.id).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/login'])
    })
  }

  isUserloggedIn():boolean{
    if(this.tokenstorage.isAuthenticated()){
      return true;
    }
    return false;
  }
}
