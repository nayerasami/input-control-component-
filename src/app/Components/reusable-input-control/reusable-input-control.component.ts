import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

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
  isSubmitted: boolean = false;
  formControls: any;
  // controlsArray: any = 'controlsArray'



  ngOnInit(): void {
    console.log(this.controlOptions)
    this.controls = this.controlOptions.inputsArray
    console.log(this.controls)
    this.typeIdentifer = this.controlOptions.typeIdentifier || 'inputType'
    this.uniqueKey = this.controlOptions.uniqueKey || 'name'


    // this.inputControlForm = new FormGroup(
    //   {
    //     ...formGroup,
    //     controlsArray: new FormArray([])
    //   })

    this.inputControlForm = new FormGroup({
      ...this.createNewFormGroup(),
      controlsArray: new FormArray([])
    })
  }


  createNewFormGroup() {
    const formGroup: any = {}
    this.controls.forEach((control: any) => {
      formGroup[control[this.uniqueKey]] = new FormControl('', control.validators || [])
    });

    return formGroup

  }

  get getControlsArr(): FormArray {
    return this.inputControlForm.get('controlsArray') as FormArray
  }


  getControl(name: any): any {
    return this.inputControlForm.get(name);
  }



  onSubmit() {

    if (this.inputControlForm.valid) {
      console.log('Form Submitted!', this.inputControlForm);
      this.isSubmitted = false;
      // this.inputControlForm.reset()
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






  deleteControl(index:any) {
    this.getControlsArr.removeAt(index)
  }


}
