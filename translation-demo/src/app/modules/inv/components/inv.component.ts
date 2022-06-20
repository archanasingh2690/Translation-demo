import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inv',
  templateUrl: './inv.component.html',
  styleUrls: ['./inv.component.css']
})
export class InvComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  callApi() {
    this.http.get('./assets/test/user-account-info.jso').subscribe(d => {
      console.log(d);
    });
  }
}
