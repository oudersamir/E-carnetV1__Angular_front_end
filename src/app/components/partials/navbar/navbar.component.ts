import { Router } from '@angular/router';
import { TokenService } from './../../../services/token.service';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:null;
  constructor(private  accountService : AccountService,
              private tokenService: TokenService,
              private router:Router) { }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res=>{
    this.currentUser=this.tokenService.getInfos();
    })
  }
    logOut(){
      this.tokenService.remove();
      this.router.navigateByUrl("/login");
      this.accountService.changeStatus(false);
    }
}
