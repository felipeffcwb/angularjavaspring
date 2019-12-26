import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getAllOfLIST() {
    return this.http.get('https://crudangular.azurewebsites.net/api/Register');
  };

  insertNewService(obj){
    return this.http.post('http://localhost:8080/Registers/add', {
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      job: obj.job
    });
  }

  deleteRegisterService(id){
    return this.http.delete('http://localhost:8080/Registers/delete/' + id);
  }

  getByIdService(id){
    return this.http.get('http://localhost:8080/Registers/get/' + id);
  }

  updateRegisterService(id, obj){
    return this.http.put('http://localhost:8080/Registers/update/' + id, {
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      job: obj.job
    });
  }

}

