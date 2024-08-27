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
  isSubmitted: boolean = false;
  formControls: any;
  maxAddedControls: any;
  controlsArr: any;
  disableAddBtn: boolean = false;


  ngOnInit(): void {
    console.log(this.controlOptions)
    this.controls = this.controlOptions.inputsArray
    console.log(this.controls)
    this.maxAddedControls = this.controlOptions.maxNumberOfControls;
    console.log(this.maxAddedControls, "max numbers")


    this.inputControlForm = new FormGroup({
      controlsArray: new FormArray([])
    })


    this.addNewControl()
    this.handleExperienceStatus()

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





  onSubmit() {
    console.log(this.inputControlForm, "form ")
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

    if (this.inputControlForm.get('controlsArray').controls.length == this.maxAddedControls) {
      this.disableAddBtn = true
    }
    console.log(this.getControlsArr.controls, 'getControlsArr')

  }






  deleteControl(index: any) {
    this.getControlsArr.removeAt(index)
  }



  handleExperienceStatus() {
    const formArray = this.inputControlForm.get('controlsArray') as FormArray;
    formArray.valueChanges.subscribe(() => {
      formArray.controls.forEach((controlGroup: any) => {
        this.controlOptions.handleGroupValuesChange(controlGroup);

      });
    })

  }



  // handleGroupValuesChange(group: any) {
  //   const currentlyWorkingControl = group?.get('experience');
  //   const endDateControl = group?.get('endDate');

  //   currentlyWorkingControl?.valueChanges.subscribe((value: any) => {
  //     console.log("check value", value);

  //     if (value) {
  //       endDateControl?.disable({ emitEvent: false });
  //     } else {
  //       endDateControl?.enable({ emitEvent: false });
  //     }
  //   });

  //   endDateControl?.valueChanges.subscribe((value: any) => {
  //     if (value) {
  //       currentlyWorkingControl?.disable({ emitEvent: false });
  //     } else {
  //       currentlyWorkingControl?.enable({ emitEvent: false });
  //     }
  //     console.log("endDateControl value", value);
  //   });


  //   if (currentlyWorkingControl.value) {
  //     endDateControl.disable({ emitEvent: false });
  //   } else if (endDateControl.value) {
  //     currentlyWorkingControl.disable({ emitEvent: false });
  //   }
  // }



}
