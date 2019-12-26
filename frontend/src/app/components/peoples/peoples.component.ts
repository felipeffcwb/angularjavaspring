import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit {
  constructor(private myService : ConfigService, private router: Router) { }

  resp: {};
  error = [];
  registers: {};
  statusRequest = false;

  ngOnInit() {
    this.myService.getAllOfLIST().subscribe(data => {
      this.registers = data;
      this.statusRequest = true;
      console.log(this.registers + " " + this.statusRequest);
    })
  }

  deleteRegister(id){
    this.myService.deleteRegisterService(id).subscribe(data => {
      this.resp = data;
      switch (this.resp) {
        case "SUCCESS":
          this.myService.getAllOfLIST().subscribe(data => {
            this.registers = data;
            console.log(this.registers);
          });
          this.error.push("Ok, register was deleted");
          break;
      
          case "FAIL":
          this.error.push("Try again");
          break;

          case "ERROR":
          this.error.push("Error");
          break;
      }
    })
  }


  sendIdByUrl(id){
    this.router.navigate(['/update', id]);
  }


}

