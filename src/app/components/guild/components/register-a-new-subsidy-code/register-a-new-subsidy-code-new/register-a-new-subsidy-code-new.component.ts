
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegisterANewSubsidyCode } from 'app/shared/models/register-a-new-subsidy-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewSubsidyCodeService } from '../shared/register-a-new-subsidy-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-subsidy-code-new',
  templateUrl: './register-a-new-subsidy-code-new.component.html',
  styleUrls: ['./register-a-new-subsidy-code-new.component.scss'],
  providers: [
    ]
})

export class RegisterANewSubsidyCodeNewComponent extends AppBaseComponent implements OnInit {
  registerANewSubsidyCodeForm: FormGroup;
  @Input() selectedRegisterANewSubsidyCode: RegisterANewSubsidyCode;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegisterANewSubsidyCodeNewComponent>,
    public registerANewSubsidyCodeService: RegisterANewSubsidyCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewSubsidyCode = new RegisterANewSubsidyCode();

    

    this.registerANewSubsidyCodeForm = this.formBuilder.group({
     
  id : [0],
  subsidyCode : [this.selectedRegisterANewSubsidyCode.subsidyCode, [ Validators.required ]],
  subsidyName : [this.selectedRegisterANewSubsidyCode.subsidyName, [ Validators.required ]],
  subsidyAmount : [this.selectedRegisterANewSubsidyCode.subsidyAmount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registerANewSubsidyCodeService.create(this.registerANewSubsidyCodeForm.value)
        .pipe(switchMap(x => {
			return this.registerANewSubsidyCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registerANewSubsidyCodeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
