import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private jwtService : JwtService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.jwtService.destroyToken();
    this.jwtService.destroyUser();
    this.router.navigateByUrl('/auth/login')
  }
}
