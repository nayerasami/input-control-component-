import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reusable-input-control',
  templateUrl: './reusable-input-control.component.html',
  styleUrls: ['./reusable-input-control.component.css']
})
export class ReusableInputControlComponent implements OnInit {

  @Input() controlOptions: any;
  @Output() myEvent = new EventEmitter()
  controls: any[] = []
  inputControlForm!: FormGroup;
  hasError: boolean = false;
  formControls: any;
  maxAddedControls: any;
  controlsArr: any;
  defaultValues: any;

  ngOnInit(): void {
    this.controls = this.controlOptions.inputsArray
    this.inputControlForm = new FormGroup({
      controlsArray: new FormArray([], this.controlOptions.formArrayValidators)
    })

    this.addNewControl();
    this.setDefaultValues()


  }


  setDefaultValues() {
    this.defaultValues = this.controlOptions.defaultControlValues
    if (this.defaultValues) {
      while (this.defaultValues.length > this.getControlsArr.controls.length) {
        this.addNewControl()
        const controls = this.getControlsArr.controls
        this.defaultValues.forEach((value: any, index: number) => {
          if (controls[index]) {
            controls[index].patchValue(value)
          }
        })
      }
    }
  }



  reset() {
    while (this.getControlsArr.length > 1) {
      this.deleteControl(1);
    }
    this.inputControlForm.reset();
  }

  createNewFormGroup() {
    const formGroup: any = {}
    this.controls.forEach((control: any) => {

      const controlDefaultValue = control.defaultValue?control.defaultValue :null
      formGroup[control.name] = new FormControl(controlDefaultValue, control.validators || []);

    });
    return new FormGroup(formGroup)
  }


  get getControlsArr(): FormArray {
    return this.inputControlForm.get('controlsArray') as FormArray;
  }



  addControl() {
    if (this.inputControlForm.status == 'VALID') {
      this.hasError = false;
      this.addNewControl()
    } else {
      this.hasError = true
    }

  }


  addNewControl() {
    const newFormGroup = this.createNewFormGroup()
    if (this.controlOptions.formGroupValidators) {
      newFormGroup.setValidators(this.controlOptions.formGroupValidators)
    }
    this.getControlsArr.push(newFormGroup)
  }

  
  setControlsValues(array: any) {
    while (array.length > this.getControlsArr.controls.length) {
      this.addNewControl()
    }
    array.forEach((el: any, index: number) => {
      this.getControlsArr.controls[index].patchValue(el)

    })
  }


  validate() {
    console.log(this.inputControlForm.value, "submitted ")
    if (this.inputControlForm.status == 'VALID') {
      this.hasError = false;
    } else {
      this.hasError = true
    }

  }

  submit() {
    console.log(this.inputControlForm.value, "submitted ")
    this.myEvent.emit(this.inputControlForm.value)
  }

  deleteControl(index: any) {
    this.getControlsArr.removeAt(index)
  }

  update() {
    if (this.controlOptions.updatedDataValues) {
      while (this.controlOptions.updatedDataValues.length > this.getControlsArr.controls.length) {
        this.addNewControl()

      }
      this.controlOptions.updatedDataValues.forEach((el: any, index: number) => {

        this.getControlsArr.controls[index].patchValue(el)

      })
    }
  }

}
