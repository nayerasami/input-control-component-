import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export class CustomValidator {


    static checkDateValidity(control: AbstractControl): ValidationErrors | null {
        const currentDate = Date.now()
        const selectedDate = new Date(control.value).getTime()
        console.log(selectedDate,"selectedDate")
        
        return selectedDate <= currentDate ? null : { invalidDate: true }

    }



    checkEndDateAndJoinDate(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const joinDate = group.get('joinDate')?.value
            const endDate = group.get('endDate')?.value

            if (!joinDate || !endDate) {
                return null
            }

            const joinDateTime = new Date(joinDate).getTime();
            console.log("checkEndDateAndJoinDate joinDateTime", joinDateTime)

            const endDateTime = new Date(endDate).getTime();
            console.log("checkEndDateAndJoinDate endDateTime", endDateTime)

            if (endDateTime <= joinDateTime) {
                return { inappropriateDate: true }

            } else {
                return null;
            }
        }

    }


    checkWorkingStatus(): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {

            const experienceValue = !group.get('experience')?.value && group.get('experience')?.dirty;
            console.log(experienceValue, "experienceValue")

            const endDate = !group.get('endDate')?.value && group.get('endDate')?.dirty;
            console.log(endDate, "endDate")


            if (experienceValue || endDate) {
                return { requiredEndDate: true }
            }
            return null;



        }
    }


}