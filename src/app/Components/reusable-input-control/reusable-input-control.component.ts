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
  inputControlForm: any;
  typeIdentifier: any;
  uniqueKey: any;
  isSubmitted: boolean = false;
  formControls: any;
  maxAddedControls: any;



  ngOnInit(): void {
    console.log(this.controlOptions)
    this.controls = this.controlOptions.inputsArray
    console.log(this.controls)
    this.typeIdentifier = this.controlOptions.typeIdentifier || 'inputType'
    this.uniqueKey = this.controlOptions.uniqueKey || 'name'


    this.inputControlForm = new FormGroup({
      mainFormGroup: new FormGroup(this.createNewFormGroup()),
      controlsArray: new FormArray([])
    })
    this.handleExperienceStatus()

//console.log("nono223" , this.getControl('mainFormGroup.el[uniqueKey]')?.hasError('minlength') && getControl('mainFormGroup.el[uniqueKey]')?.touched )
  }


  createNewFormGroup() {
    const formGroup: any = {}
    this.controls.forEach((control: any) => {
      formGroup[control[this.uniqueKey]] = new FormControl('', control.validators || [])
    },{Validators:this.controlOptions.formGroupValidators});

    return formGroup

  }

  get getControlsArr(): FormArray {
    return this.inputControlForm.get('controlsArray') as FormArray
  }


  getControl(controlName: string): AbstractControl | null {
    return this.inputControlForm.get(`mainFormGroup.${controlName}`);
  }
  


  onSubmit() {
    console.log(this.inputControlForm, "form inputs")
    if (this.inputControlForm.valid) {
      console.log('Form Submitted!', this.inputControlForm);
      this.isSubmitted = false;
      this.addNewControl()

    } else {
      this.isSubmitted = true
    }


  }


  addNewControl() {
    const newFormGroup = new FormGroup(this.createNewFormGroup())
    this.getControlsArr.push(newFormGroup)
    console.log(this.getControlsArr, 'getControlsArr')
  }






  deleteControl(index: any) {
    this.getControlsArr.removeAt(index)
  }



  handleExperienceStatus() {
    const mainFormGroup = this.inputControlForm.get('mainFormGroup') as FormGroup;
    const formArray = this.inputControlForm.get('controlsArray') as FormArray;
    this.handleGroupValuesChange(mainFormGroup);
    formArray.valueChanges.subscribe(() => {
      formArray.controls.forEach((controlGroup: any) => {
        console.log(controlGroup, "nono")
        this.handleGroupValuesChange(controlGroup);

      });

    })




  }



  handleGroupValuesChange(group: any) {
    const currentlyWorkingControl = group?.get('experience');
    const endDateControl = group?.get('endDate');

    currentlyWorkingControl?.valueChanges.subscribe((value: any) => {
      console.log("check value", value);

      if (value) {
        endDateControl?.disable({ emitEvent: false });
      } else {
        endDateControl?.enable({ emitEvent: false });
      }
    });

    endDateControl?.valueChanges.subscribe((value: any) => {
      if (value) {
        currentlyWorkingControl?.disable({ emitEvent: false });
      } else {
        currentlyWorkingControl?.enable({ emitEvent: false });
      }
      console.log("endDateControl value", value);
    });

  }










}
