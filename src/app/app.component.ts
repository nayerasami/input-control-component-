import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { IinputAttributes, Ioptions } from './Models/options';
import { CustomValidator } from '../../src/app/validators/customValidators'
import { ReusableInputControlComponent } from './Components/reusable-input-control/reusable-input-control.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'multi-input-control';
  @ViewChild('formInputControl') formInputControlRef !: ReusableInputControlComponent;
  inputControlFormArray: any;
  constructor(private cdr: ChangeDetectorRef) { }

  experiences: any;

  getExperiencesValues(e: any) {

    this.experiences = e;
    console.log(this.experiences, "experiences values")
  }



  inputsAttributes: IinputAttributes[] = [
    {
      type: 'text',
      label: 'id',
      name: 'id',
      inputType: 'text',
    },
    {
      type: 'text',
      label: 'Company Name',
      defaultValue: 'first company',
      name: 'companyName',
      inputType: 'text',
      validators: [
        Validators.minLength(4),
        Validators.required
      ],
      errorMessages: {
        required: 'Enter Valid Company name',
        minlength: 'company name must be at least 4'
      }
    },
    {

      type: 'date',
      label: 'Join Date',
      name: 'joinDate',
      inputType: 'text',
      validators: [
        Validators.required,
        CustomValidator.checkDateValidity
      ],
      errorMessages: {
        requiredMessage: 'Enter Valid join date',
        invalidDate: 'The date must be in the past'

      }
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'endDate',
      inputType: 'text',
      validators: [
        CustomValidator.checkDateValidity

      ],
      errorMessages: {
        invalidDate: 'The date must be in the past'

      }
    }, {
      type: 'checkbox',
      label: 'experience',
      name: 'experience',
      inputType: 'checkbox',
      value: 'currently working',
      validators: [

      ],
      errorMessages: {

      }
    },
  ]

  // defaultValues: {} = [
  //   {
  //     "companyName": "company1",
  //     "joinDate": "2022-08-20",
  //     "endDate": null,
  //     "experience": true

  //   }, {
  //     "companyName": "company3",
  //     "joinDate": "2000-08-20",
  //     "endDate": "2019-09-27",

  //   }, {
  //     "companyName": "company2",
  //     "joinDate": "2004-08-01",
  //     "endDate": "2020-09-27",
  //   },
  // ]


  updatedData: {} = [
    {
      "companyName": "company1",
      "joinDate": "2022-08-20",
      "endDate": null,
      "experience": true

    }, {
      "companyName": "company3",
      "joinDate": "2000-08-20",
      "endDate": "2019-09-27",

    }, {
      "companyName": "company2",
      "joinDate": "2004-08-01",
      "endDate": "2020-09-27",
    }
  ]

  options: Ioptions = {

    inputsArray: this.inputsAttributes,
    formGroupValidators: [
      CustomValidator.checkEndDateAndJoinDate(),
      CustomValidator.checkWorkingStatus()
    ],
    errorMessages: {
      inappropriateDate: 'End date is set before the start date',
      requiredEndDate: 'You must enter the job status'
    },
    formArrayValidators: [CustomValidator.checkArrayMaxLength],
    formArrayErrors: {
      formArrayLength: "you can't add more "
    },
    //defaultControlValues: this.defaultValues,
    updatedDataValues: this.updatedData

  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    const controlsArray = this.formInputControlRef.inputControlForm.get('controlsArray') as FormArray;
    this.inputControlFormArray = controlsArray;

    if (this.inputControlFormArray.controls.length > 1) {
      this.inputControlFormArray.controls.forEach((formGroupControl: any) => {
        if (formGroupControl instanceof FormGroup) {
          this.handleGroupValuesChange(formGroupControl)
        }
      })

      this.cdr.detectChanges();
    }



    this.handleExperienceStatus();


  }



  handleGroupValuesChange(group: any) {
    const currentlyWorkingControl = group?.get('experience');
    const endDateControl = group?.get('endDate');
    if (currentlyWorkingControl.value) {
      endDateControl.disable({ emitEvent: false });
    } else if (endDateControl.value) {
      currentlyWorkingControl.disable({ emitEvent: false });
    }


    currentlyWorkingControl?.valueChanges.subscribe((value: any) => {
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
    });



  }

  handleExperienceStatus() {
    if (this.inputControlFormArray) {


      this.inputControlFormArray.valueChanges.subscribe(() => {
        this.inputControlFormArray.controls.forEach((controlGroup: any) => {

          if (controlGroup instanceof FormGroup) {
            this.handleGroupValuesChange(controlGroup);
          }
        });
      })
    }
  }


  submit() {
    this.formInputControlRef.submit()
  }
  reset() {
    this.formInputControlRef.reset()
  }
  update() {
    this.formInputControlRef.update()
  }


}
