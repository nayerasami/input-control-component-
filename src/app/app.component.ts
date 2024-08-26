import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Ioptions } from './Models/options';
import { CustomValidator } from '../../src/app/validators/customValidators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multi-input-control';

  inputsAttributes: any = [
    {
      type: 'text',
      label: 'Company Name',
      name: 'companyName',
      inputType: 'text',
      validators: [
        Validators.minLength(4),
        Validators.required
      ],
      errorMessages: {
        requiredMessage: 'Enter Valid Company name',
        minLengthMessage: 'company name must be at least 4'
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
        validDateMessage: 'The date must be in the past'

      }
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'finishDate',
      inputType: 'text',
      validators: [
        CustomValidator.checkDateValidity

      ],
      errorMessages: {
        validDateMessage: 'The date must be in the past'

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


  options: Ioptions = {
    typeIdentifier: 'inputType',
    uniqueKey: 'name',
    inputsArray: this.inputsAttributes,
    maxNumberOfControls: 5,
    formGroupValidators:[
      CustomValidator.prototype.checkEndDateAndJoinDate(),
      CustomValidator.prototype.checkWorkingStatus()

    ],
    errorMessages:{
      endAndJoinDateMessage:'End date is set before the start date',
      requiredEndDateMessage:'You must enter the job status'
    }
  }








}
