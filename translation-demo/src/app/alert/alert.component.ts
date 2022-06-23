import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Alert, AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit,OnChanges {

  @Input() apiError: Alert[] = [];
  constructor(public alertService: AlertService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.apiError = this.alertService.alerts;
  }
}
