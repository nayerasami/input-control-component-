import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reusable-input-control',
  templateUrl: './reusable-input-control.component.html',
  styleUrls: ['./reusable-input-control.component.css']
})
export class ReusableInputControlComponent implements OnInit {
  @Input() controlOptions: any;
  controls: any[] = []
  inputControlForm: any;
  typeIdentifer: any;
  uniqueKey: any;
  ngOnInit(): void {

    console.log(this.controlOptions)
    this.controls = this.controlOptions.inputsArray
    console.log(this.controls)
    this.typeIdentifer = this.controlOptions.typeIdentifier
    this.uniqueKey = this.controlOptions.uniqueKey
    const formGroup: any = {};


    this.controls.forEach((control: any) => {
      formGroup[control.name] = new FormControl('', control.validators || [])
    });

    this.inputControlForm = new FormGroup(formGroup)

    console.log(formGroup)
  }

  onSubmit() {
    console.log(this.inputControlForm.value)
  }


  addNewControl() {

  }


  deleteControl() {

  }


}
