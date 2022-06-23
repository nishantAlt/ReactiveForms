import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      contactPreference: ['email'],
      emailGroup: this.fb.group(
        {
          email: [
            '',
            [Validators.required, CustomValidators.emailDomains('dell.com')],
          ],
          confirmEmail: ['', Validators.required],
        },
        {
          validator: CustomValidators.matchEmail,
        }
      ),
      phone: ['', []],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
    });
  }

  validationMessages = {
    fullName: {
      required: 'Full Name is required',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },
    email: {
      required: 'Email is required',
      emailDomain: 'Email domain should be dell.com',
    },
    confirmEmail: {
      required: 'Confirm Email is required',
    },
    emailGroup: {
      emailMismatch: 'Email and Confirm Email do not match',
    },
    phone: {
      required: 'Phone is required',
    },

    skillName: {
      required: 'Skill Name is required',
    },
    experienceInYears: {
      required: 'Experience is required',
    },
    proficiency: {
      required: 'Proficiency is required',
    },
  };

  formErrors = {
    fullName: '',
    email: '',
    confirmEmail: '',
    emailGroup: '',
    phone: '',
    skillName: '',
    experienceInYears: '',
    proficiency: '',
  };

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    const emailControl = this.employeeForm.get('emailGroup')?.get('email');
    const confirmEmailControl = this.employeeForm
      .get('emailGroup')
      ?.get('confirmEmail');
    if (selectedValue === 'phone') {
      phoneControl?.setValidators([Validators.required]);
      emailControl?.clearValidators();
      confirmEmailControl?.clearValidators();
      console.log('Phone');
    }
    if (selectedValue === 'email') {
      emailControl?.setValidators([
        Validators.required,
        CustomValidators.emailDomains('dell.com'),
      ]);
      confirmEmailControl?.setValidators([Validators.required]);
      phoneControl?.clearValidators();
      console.log('Email');
    }
    phoneControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
    confirmEmailControl?.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.employeeForm.valueChanges.subscribe((value: any) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm
      .get('contactPreference')
      ?.valueChanges.subscribe((data: string) => {
        this.onContactPreferenceChange(data);
      });
  }

  // this.employeeForm.get('skills')?.valueChanges.subscribe((value:any)=>{
  //   console.log(JSON.stringify(value));
  // })

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      (this.formErrors as any)[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = (this.validationMessages as any)[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            (this.formErrors as any)[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      // if (abstractControl instanceof FormArray) {
      //   for(const control of abstractControl.controls){
      //     if(control instanceof FormGroup){
      //       this.logValidationErrors(control);
      //     }

      //   }
      // }
    });
    //console.log(this.formErrors)
    //console.log(this.employeeForm.controls['fullName'].errors?.['minlength'])
  }

  removeSkillButtonClick(skillGroupIndex: number):void{
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex)
  }

  addSkillButtonClick(){
    (<FormArray>this.employeeForm.controls['skills']).push(this.addSkillFormGroup());
  }

  getControls() {
    return (this.employeeForm.get('skills') as FormArray).controls;
  }

  addSkillFormGroup():FormGroup{
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
    })
  }


  onLoadDataClick(): void {

    const formGroup=this.fb.group([
      new FormControl('John',[Validators.required]),
      new FormControl('IT',[Validators.required]),
      new FormControl('',[Validators.required]),
    ])
    const formArray1=this.fb.array([
      new FormControl('John',[Validators.required]),
      new FormControl('IT',[Validators.required]),
      new FormControl('',[Validators.required]),
    ])

    console.log(formArray1);
    console.log(formGroup);
    
    
    // this.employeeForm.setValue({
    //   fullName: "Nishant Badlani",
    //   email: "nishant@gmail.com",
    //   skills:{
    //     skillName: "C#",
    //     experienceInYears: "0.5",
    //     proficiency: "beginner"
    //   }
    // })
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls['fullName'].value);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}
