import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() field: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onButtonClick?: EventEmitter<any> = new EventEmitter<any>();
  formControl = new FormControl(null, [Validators.required]);
  constructor() { }

  ngOnInit() {
  }

  onButtonClicked() {
    if (this.formControl.value) {
      const payload = {
        id: this.field.id,
        value: this.formControl.value
      };
      this.onButtonClick.emit(payload);
      this.formControl.reset();
    }
  }

}
