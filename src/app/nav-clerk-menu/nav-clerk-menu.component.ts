import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav-clerk-menu',
  templateUrl: './nav-clerk-menu.component.html',
  styleUrls: ['./nav-clerk-menu.component.scss']
})
export class NavClerkMenuComponent implements OnInit {

  constructor(private auth: AuthService, private tokenstorage:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    let user=JSON.parse(this.tokenstorage.getUser());
    let role={role: user.role};
    console.log(role);
    console.log(user);
    this.auth.logout(role, user.id).subscribe(data=>{
      console.log(data);
      this.tokenstorage.signOut();
      this.router.navigate(['/login'])
    })
  
  }

}
