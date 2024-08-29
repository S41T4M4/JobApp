import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']  // Corrigido para 'styleUrls'
})
export class AlertsComponent {
@Input() message : string = '';
 @Input() alertStyles: { [key: string]: string } = {};
 @Input() show: boolean = false;
 
 
  showAlert(message: string) {
    this.message = message;
  }

  closeAlert() {
    this.message = '';
  }
}
