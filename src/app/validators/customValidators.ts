import { AbstractControl, ValidationErrors } from "@angular/forms"

export class CustomValidator {


    static checkDateValidity(control: AbstractControl): ValidationErrors | null {
        const currentDate = Date.now()
        const selectedDate = new Date(control.value).getTime()

        return selectedDate < currentDate ? null : { invalidDate: true }

    }


}