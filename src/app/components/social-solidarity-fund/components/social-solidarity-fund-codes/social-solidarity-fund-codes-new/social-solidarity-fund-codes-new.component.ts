
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SocialSolidarityFundCodes } from 'app/shared/models/social-solidarity-fund-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SocialSolidarityFundCodesService } from '../shared/social-solidarity-fund-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-social-solidarity-fund-codes-new',
  templateUrl: './social-solidarity-fund-codes-new.component.html',
  styleUrls: ['./social-solidarity-fund-codes-new.component.scss'],
  providers: [
    ]
})

export class SocialSolidarityFundCodesNewComponent extends AppBaseComponent implements OnInit {
  socialSolidarityFundCodesForm: FormGroup;
  @Input() selectedSocialSolidarityFundCodes: SocialSolidarityFundCodes;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SocialSolidarityFundCodesNewComponent>,
    public socialSolidarityFundCodesService: SocialSolidarityFundCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialSolidarityFundCodes = new SocialSolidarityFundCodes();

    

    this.socialSolidarityFundCodesForm = this.formBuilder.group({
     
  id : [0],
  codeType : [this.selectedSocialSolidarityFundCodes.codeType, [ Validators.required ]],
  statementCode : [this.selectedSocialSolidarityFundCodes.statementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.socialSolidarityFundCodesService.create(this.socialSolidarityFundCodesForm.value)
        .pipe(switchMap(x => {
			return this.socialSolidarityFundCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.socialSolidarityFundCodesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
