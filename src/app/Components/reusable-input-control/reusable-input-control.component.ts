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

    this.defaultValues = this.controlOptions.defaultControlValues

    console.log(this.defaultValues, "defaultValues")
    this.inputControlForm = new FormGroup({
      controlsArray: new FormArray([], this.controlOptions.formArrayValidators)
    })

    this.addNewControl()
    while (this.defaultValues.length > this.getControlsArr.controls.length) {
      this.addNewControl()
      console.log(this.getControlsArr.controls)
      this.controlPatchValues()
    }
   
  }


  controlPatchValues() {
    const controls =this.getControlsArr.controls
    this.defaultValues.forEach((value: any,index:number) => {
      if(controls[index]){
        console.log(value ,"single defualt value ")
        controls[index].patchValue(value)

      }
    })

    console.log(this.getControlsArr.controls, "controlPatchValues")

  }

  reset() {
    this.inputControlForm.reset()
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
    console.log(this.inputControlForm, "form submittt")

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
    console.log(this.getControlsArr.controls, 'getControlsArr')
  }




  submit() {
    console.log(this.inputControlForm.value, "submitted ")
  }

  deleteControl(index: any) {
    this.getControlsArr.removeAt(index)
  }



}
