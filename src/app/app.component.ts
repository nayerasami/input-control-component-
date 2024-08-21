import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Ioptions } from './Models/options';

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
      lable: 'Company Name',
      name: 'companyName',
      inputType: 'text',
      validators: [
        Validators.minLength(4),
        Validators.required
      ]
    },
    {
      type: 'date',
      lable: 'Join Date',
      name: 'joinDate',
      inputType: 'text',
      validators: [
        Validators.required
      ]
    },{
      type: 'checkbox',
      lable: 'experiance',
      name: 'experiance',
      inputType: 'checkbox',
      value: 'currently working',
      validators: [
        Validators.required
      ]
    },
  ]


  options: Ioptions = {

    typeIdentifier:'inputType' ,
    uniqueKey:'name',
    inputsArray: this.inputsAttributes,
    maxNunmberOfControls: 10

  }








}
