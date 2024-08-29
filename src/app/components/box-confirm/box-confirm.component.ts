import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-box-confirm',
  templateUrl: './box-confirm.component.html',
  styleUrls: ['./box-confirm.component.css'],
})
export class BoxConfirmComponent {
  @Input() message: string = '';
  @Input() show: boolean =false;
  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();
constructor(private router : Router){}

  onConfirm() {
    
    this.confirmEvent.emit();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onCancel() {
    this.cancelEvent.emit();
    this.show = false;
  }
}
