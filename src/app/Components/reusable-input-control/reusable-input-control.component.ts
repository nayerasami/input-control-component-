import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reusable-input-control',
  templateUrl: './reusable-input-control.component.html',
  styleUrls: ['./reusable-input-control.component.css']
})
export class ReusableInputControlComponent implements OnInit {

  @Input() controlOptions: any;
  controls: any[] = []
  inputControlForm!: FormGroup;
  isSubmitted: boolean = false;
  formControls: any;
  maxAddedControls: any;
  controlsArr: any;
  defaultValues: any;

  ngOnInit(): void {
    console.log(this.controlOptions)
    this.controls = this.controlOptions.inputsArray
    console.log(this.controls)
    console.log(this.defaultValues, "defaultValues")
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
      formGroup[control.name] = new FormControl('', control.validators || []);

    });
    return new FormGroup(formGroup)
  }


  get getControlsArr(): FormArray {
    return this.inputControlForm.get('controlsArray') as FormArray;
  }



  addControl() {
    if (this.inputControlForm.status == 'VALID') {
      console.log('Form Submitted!', this.inputControlForm);
      this.isSubmitted = false;
      this.addNewControl()
    } else {
      this.isSubmitted = true
    }

  }


  addNewControl() {
    const newFormGroup = this.createNewFormGroup()
    if (this.controlOptions.formGroupValidators) {
      newFormGroup.setValidators(this.controlOptions.formGroupValidators)
    }
    this.getControlsArr.push(newFormGroup)
  }




  submit() {
    console.log(this.inputControlForm.value, "submitted ")
  }

  deleteControl(index: any) {
    this.getControlsArr.removeAt(index)
  }

  update() {
    if (this.controlOptions.updatedDataValues) {
      this.controlOptions.updatedDataValues.forEach((el: any, index: number) => {

        this.getControlsArr.controls[index].patchValue(el)

      })
    }

  }

}
