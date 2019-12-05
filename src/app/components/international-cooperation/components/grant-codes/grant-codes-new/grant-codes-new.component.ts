
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GrantCodes } from 'app/shared/models/grant-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GrantCodesService } from '../shared/grant-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-grant-codes-new',
  templateUrl: './grant-codes-new.component.html',
  styleUrls: ['./grant-codes-new.component.scss'],
  providers: [
    ]
})

export class GrantCodesNewComponent extends AppBaseComponent implements OnInit {
  grantCodesForm: FormGroup;
  @Input() selectedGrantCodes: GrantCodes;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GrantCodesNewComponent>,
    public grantCodesService: GrantCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantCodes = new GrantCodes();

    

    this.grantCodesForm = this.formBuilder.group({
     
  id : [0],
  grantCode : [this.selectedGrantCodes.grantCode, [ Validators.required ]],
  grantName : [this.selectedGrantCodes.grantName, [ ]],
  entityCode : [this.selectedGrantCodes.entityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.grantCodesService.create(this.grantCodesForm.value)
        .pipe(switchMap(x => {
			return this.grantCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.grantCodesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
