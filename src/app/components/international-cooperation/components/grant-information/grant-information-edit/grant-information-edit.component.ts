
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GrantInformation } from 'app/shared/models/grant-information';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GrantInformationService } from '../shared/grant-information.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-grant-information-edit',
  templateUrl: './grant-information-edit.component.html',
  styleUrls: ['./grant-information-edit.component.scss'],
  providers: []
})

export class GrantInformationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrantInformation: GrantInformation;
  grantInformationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrantInformationDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrantInformationEditComponent>,
    public grantInformationService: GrantInformationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantInformation = new GrantInformation();
    this.selectedGrantInformation = this.selectedGrantInformationDialog.data || this.selectedGrantInformation;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.grantInformationForm = this.formBuilder.group({
      
  id : [this.selectedGrantInformation.id],
  grantCode : [this.selectedGrantInformation.grantCode, [ Validators.required ]],
  grantName : [this.selectedGrantInformation.grantName, [ Validators.required ]],
  entityCode : [this.selectedGrantInformation.entityCode, [ ]],
  schoolNumber : [this.selectedGrantInformation.schoolNumber, [ Validators.required ]],
  contributionRatio : [this.selectedGrantInformation.contributionRatio, [ Validators.required ]],
  grantStartdate : [this.selectedGrantInformation.grantStartdate, [ Validators.required ]],
  grantEndDate : [this.selectedGrantInformation.grantEndDate, [ Validators.required ]],
  totalAmount : [this.selectedGrantInformation.totalAmount, [ Validators.required ]],
  offeringType : [this.selectedGrantInformation.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.grantInformationService.update(this.grantInformationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.grantInformationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.grantInformationForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
