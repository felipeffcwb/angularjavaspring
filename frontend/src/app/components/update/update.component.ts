import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id = null;
  name = '';
  email = '';
  phone = '';
  job = '';
  
  oldRegister = {}

  error = [];

  constructor(private myService : ConfigService, 
    private router: Router, 
    private routerParam: ActivatedRoute) { }

  ngOnInit() {
    const firstParam: string = this.routerParam.snapshot.paramMap.get('id');
    this.myService.getByIdService(firstParam).subscribe(data => {
      this.id = data['id'];
      this.name = data['name'];
      this.email = data['email'];
      this.phone = data['phone'];
      this.job = data['job'];
    })
  }

  updateRegister(){
    this.oldRegister = {name: this.name, email: this.email, phone: this.phone, job: this.job}
    console.log(this.id);
    this.myService.updateRegisterService(this.id, this.oldRegister).subscribe(data => {
      console.log(this.oldRegister);
      switch (data) {
        case "SUCCESS":
          this.error.push("Ok, its fine!");
          setTimeout(() => this.router.navigate(['/peoples']), 1000);
          break;
      
          case "FAIL":
          this.error.push("Try again");
          break;

          case "ERROR":
          this.error.push("Error");
          break;
      }
    });
    console.log(this.error);
  }

}
