import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-show-error',
  template: `
    <div *ngIf="errorMessages" class="alert alert-danger error-msg">
        <div *ngFor="let errorMessage of errorMessages">
            {{errorMessage}}
        </div>
    </div>`
})
export class ShowErrorComponent {

  @Input('path') controlPath: string;

  private form: FormGroup;

  constructor(ngForm: NgForm) {
    this.form = ngForm.form;
  }

  get errorMessages(): string[] {
    const control = this.form.get(this.controlPath);
    const messages = [];
    if (!control || !(control.touched) || !control.errors) {
      return null;
    }
    for (const code in control.errors) {

      // Berechnung der lesbaren Fehlermeldungen
      if (control.errors.hasOwnProperty(code)) {
        const error = control.errors[code];
        let message = '';
        switch (code) {
          case 'invalidIfCond':
            message = `${error.msg}`;
            break;
          default:
            message = `${name} is not valid`;
        }
        messages.push(message);
      }
    }
    return messages;
  }
}
