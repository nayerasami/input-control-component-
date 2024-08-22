import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Ioptions } from './Models/options';
import {CustomValidator} from '../../src/app/validators/customValidators'
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
      errorMasseges:{
        requiredMassege:'Enter Valid Company name',
        minLengthMassege :'company name must be at least 4'
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
      ] ,
      errorMasseges:{
        requiredMessage:'Enter Valid date',
        validDateMessage:'The date must be in the past'

      }
    },{
      type: 'checkbox',
      label: 'experiance',
      name: 'experiance',
      inputType: 'checkbox',
      value: 'currently working',
      validators: [
        Validators.required
      ],
      errorMasseges:{
        requiredMassege:'you must check the work status',
      }
    },
  ]


  options: Ioptions = {
    typeIdentifier:'inputType' ,
    uniqueKey:'name',
    inputsArray: this.inputsAttributes,
    maxNunmberOfControls: 10

  }








}
