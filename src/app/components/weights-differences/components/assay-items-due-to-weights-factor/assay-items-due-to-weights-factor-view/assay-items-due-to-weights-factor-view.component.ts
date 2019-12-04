
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayItemsDueToWeightsFactor } from 'app/shared/models/assay-items-due-to-weights-factor';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItemsDueToWeightsFactorService } from '../shared/assay-items-due-to-weights-factor.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-items-due-to-weights-factor-view',
  templateUrl: './assay-items-due-to-weights-factor-view.component.html',
  styleUrls: ['./assay-items-due-to-weights-factor-view.component.scss'],
  providers: []
})

export class AssayItemsDueToWeightsFactorViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayItemsDueToWeightsFactor: AssayItemsDueToWeightsFactor;
  assayItemsDueToWeightsFactorForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
clauseSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayItemsDueToWeightsFactorDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayItemsDueToWeightsFactorViewComponent>,
    public assayItemsDueToWeightsFactorService: AssayItemsDueToWeightsFactorService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItemsDueToWeightsFactor = this.selectedAssayItemsDueToWeightsFactorDialog.data || this.selectedAssayItemsDueToWeightsFactor;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.clauseSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'البند',
	});


    this.assayItemsDueToWeightsFactorForm = this.formBuilder.group({
      
  buildingCode : [this.selectedAssayItemsDueToWeightsFactor.buildingCode],
  buildingName : [this.selectedAssayItemsDueToWeightsFactor.buildingName],
  extensionCode : [this.selectedAssayItemsDueToWeightsFactor.extensionCode],
  yearPlan : [this.selectedAssayItemsDueToWeightsFactor.yearPlan],
  sample : [this.selectedAssayItemsDueToWeightsFactor.sample],
  pricingYear : [this.selectedAssayItemsDueToWeightsFactor.pricingYear],
  constructionType : [this.selectedAssayItemsDueToWeightsFactor.constructionType],
  employmentType : [this.selectedAssayItemsDueToWeightsFactor.employmentType],
  clause : [this.selectedAssayItemsDueToWeightsFactor.clause]
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
    return this.assayItemsDueToWeightsFactorForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayItemsDueToWeightsFactorForm.controls)) {
      this.assayItemsDueToWeightsFactorForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

