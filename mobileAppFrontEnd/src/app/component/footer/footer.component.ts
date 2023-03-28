import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/authService/login.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public user:LoginService) { }

  ngOnInit(): void {
  }
}
