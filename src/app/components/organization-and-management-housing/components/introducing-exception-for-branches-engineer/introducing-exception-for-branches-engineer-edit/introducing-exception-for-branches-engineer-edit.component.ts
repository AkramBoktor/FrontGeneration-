
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IntroducingExceptionForBranchesEngineer } from 'app/shared/models/introducing-exception-for-branches-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IntroducingExceptionForBranchesEngineerService } from '../shared/introducing-exception-for-branches-engineer.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-exception-for-branches-engineer-edit',
  templateUrl: './introducing-exception-for-branches-engineer-edit.component.html',
  styleUrls: ['./introducing-exception-for-branches-engineer-edit.component.scss'],
  providers: []
})

export class IntroducingExceptionForBranchesEngineerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingExceptionForBranchesEngineer: IntroducingExceptionForBranchesEngineer;
  introducingExceptionForBranchesEngineerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingExceptionForBranchesEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingExceptionForBranchesEngineerEditComponent>,
    public introducingExceptionForBranchesEngineerService: IntroducingExceptionForBranchesEngineerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingExceptionForBranchesEngineer = new IntroducingExceptionForBranchesEngineer();
    this.selectedIntroducingExceptionForBranchesEngineer = this.selectedIntroducingExceptionForBranchesEngineerDialog.data || this.selectedIntroducingExceptionForBranchesEngineer;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.introducingExceptionForBranchesEngineerForm = this.formBuilder.group({
      
  id : [this.selectedIntroducingExceptionForBranchesEngineer.id],
  executiveEngineerNumber : [this.selectedIntroducingExceptionForBranchesEngineer.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedIntroducingExceptionForBranchesEngineer.schoolNumber, [ Validators.required ]],
  attachedNumber : [this.selectedIntroducingExceptionForBranchesEngineer.attachedNumber, [ Validators.required ]],
  yearPlan : [this.selectedIntroducingExceptionForBranchesEngineer.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedIntroducingExceptionForBranchesEngineer.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedIntroducingExceptionForBranchesEngineer.supervisionBeginningDate, [ Validators.required ]],
  type : [this.selectedIntroducingExceptionForBranchesEngineer.type, [ Validators.required ]],
  branchCode : [this.selectedIntroducingExceptionForBranchesEngineer.branchCode, [ Validators.required ]],
  constructionType : [this.selectedIntroducingExceptionForBranchesEngineer.constructionType, [ Validators.required ]],
  offeringType : [this.selectedIntroducingExceptionForBranchesEngineer.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.introducingExceptionForBranchesEngineerService.update(this.introducingExceptionForBranchesEngineerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.introducingExceptionForBranchesEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.introducingExceptionForBranchesEngineerForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
