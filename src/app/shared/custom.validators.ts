import { AbstractControl } from "@angular/forms";

export class CustomValidators{
    static emailDomain(control: AbstractControl): {[key:string]:any}|null{
        const email:string=control.value;
        const domain = email.substring(email.lastIndexOf('@')+1);
        if(email)
        {
          if(domain.toLowerCase()==='pragimtech.com'){
            return null;
          }
          else{
            return {'emailDomain':true};
          }
        }
        else{
          return null
        }
    }
    
    static emailDomains(domainName: string){
      return (control: AbstractControl): {[key:string]:any}|null =>{
        const email:string=control.value;
        const domain = email.substring(email.lastIndexOf('@')+1);
        if(email)
        {
          if(domain.toLowerCase()===domainName.toLowerCase()){
            return null;
          }
          else{
            return {'emailDomain':true};
          }
        }
        else{
          return null
        }
      };
    }

    static matchEmail(group: AbstractControl) : {[key:string]:any} | null
    {
        const emailControl=group.get('email');
        const confirmEmailControl=group.get('confirmEmail');
        if(emailControl?.value===confirmEmailControl?.value || confirmEmailControl?.pristine)
        {   
            return null;
        }
        else{
            return {'emailMismatch':true};
        }
    }
}
