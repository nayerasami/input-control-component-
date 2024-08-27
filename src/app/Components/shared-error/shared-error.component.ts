import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-error',
  templateUrl: './shared-error.component.html',
  styleUrls: ['./shared-error.component.css']
})
export class SharedErrorComponent implements OnInit{
@Input() errorMessages:any;
@Input() control:any;


ngOnInit(): void {

console.log(this.errorMessages,"errorMessages")
console.log(this.control,"controls")

}

getErrorKeys(): string[] {
  return this.control ? Object.keys(this.control.errors || {}) : [];
}

getErrorMessages (errorKey:any) :string{
  console.log(this.errorMessages[errorKey] )
  return this.errorMessages[errorKey]  || ''
}

}
