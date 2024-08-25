import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export class CustomValidator {


    static checkDateValidity(control: AbstractControl): ValidationErrors | null {
        const currentDate = Date.now()
        const selectedDate = new Date(control.value).getTime()

        return selectedDate < currentDate ? null : { invalidDate: true }

    }



    checkEndDateAndJoinDate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const joinDate = control.get('joinDate')?.value.getTime()
            const endDate = control.get('endDate')?.value.getTime()
            let dateError ={'inappropriateDate ':true}
            if (!joinDate || !endDate || !joinDate.value || !endDate.value) {
                return null
            }
            return endDate >= joinDate ? null: dateError

        }

    }
}