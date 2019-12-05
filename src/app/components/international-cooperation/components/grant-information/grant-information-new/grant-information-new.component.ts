
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GrantInformation } from 'app/shared/models/grant-information';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GrantInformationService } from '../shared/grant-information.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-grant-information-new',
  templateUrl: './grant-information-new.component.html',
  styleUrls: ['./grant-information-new.component.scss'],
  providers: [
    ]
})

export class GrantInformationNewComponent extends AppBaseComponent implements OnInit {
  grantInformationForm: FormGroup;
  @Input() selectedGrantInformation: GrantInformation;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GrantInformationNewComponent>,
    public grantInformationService: GrantInformationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantInformation = new GrantInformation();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.grantInformationForm = this.formBuilder.group({
     
  id : [0],
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
    this.grantInformationService.create(this.grantInformationForm.value)
        .pipe(switchMap(x => {
			return this.grantInformationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.grantInformationForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
