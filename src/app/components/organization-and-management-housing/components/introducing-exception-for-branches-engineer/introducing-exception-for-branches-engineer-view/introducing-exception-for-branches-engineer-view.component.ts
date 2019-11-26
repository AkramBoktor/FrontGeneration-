
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IntroducingExceptionForBranchesEngineer } from 'app/shared/models/introducing-exception-for-branches-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingExceptionForBranchesEngineerService } from '../shared/introducing-exception-for-branches-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-exception-for-branches-engineer-view',
  templateUrl: './introducing-exception-for-branches-engineer-view.component.html',
  styleUrls: ['./introducing-exception-for-branches-engineer-view.component.scss'],
  providers: []
})

export class IntroducingExceptionForBranchesEngineerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingExceptionForBranchesEngineer: IntroducingExceptionForBranchesEngineer;
  introducingExceptionForBranchesEngineerForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingExceptionForBranchesEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingExceptionForBranchesEngineerViewComponent>,
    public introducingExceptionForBranchesEngineerService: IntroducingExceptionForBranchesEngineerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  executiveEngineerNumber : [this.selectedIntroducingExceptionForBranchesEngineer.executiveEngineerNumber],
  schoolNumber : [this.selectedIntroducingExceptionForBranchesEngineer.schoolNumber],
  attachedNumber : [this.selectedIntroducingExceptionForBranchesEngineer.attachedNumber],
  yearPlan : [this.selectedIntroducingExceptionForBranchesEngineer.yearPlan],
  bidNumber : [this.selectedIntroducingExceptionForBranchesEngineer.bidNumber],
  supervisionBeginningDate : [this.selectedIntroducingExceptionForBranchesEngineer.supervisionBeginningDate],
  type : [this.selectedIntroducingExceptionForBranchesEngineer.type],
  branchCode : [this.selectedIntroducingExceptionForBranchesEngineer.branchCode],
  constructionType : [this.selectedIntroducingExceptionForBranchesEngineer.constructionType],
  offeringType : [this.selectedIntroducingExceptionForBranchesEngineer.offeringType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.introducingExceptionForBranchesEngineerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.introducingExceptionForBranchesEngineerForm.controls)) {
      this.introducingExceptionForBranchesEngineerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

