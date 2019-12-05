
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayWeightsFactorItems } from 'app/shared/models/assay-weights-factor-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayWeightsFactorItemsService } from '../shared/assay-weights-factor-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-weights-factor-items-view',
  templateUrl: './assay-weights-factor-items-view.component.html',
  styleUrls: ['./assay-weights-factor-items-view.component.scss'],
  providers: []
})

export class AssayWeightsFactorItemsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayWeightsFactorItems: AssayWeightsFactorItems;
  assayWeightsFactorItemsForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayWeightsFactorItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayWeightsFactorItemsViewComponent>,
    public assayWeightsFactorItemsService: AssayWeightsFactorItemsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayWeightsFactorItems = this.selectedAssayWeightsFactorItemsDialog.data || this.selectedAssayWeightsFactorItems;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.jobTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.assayWeightsFactorItemsForm = this.formBuilder.group({
      
  buildingCode : [this.selectedAssayWeightsFactorItems.buildingCode],
  extensionCode : [this.selectedAssayWeightsFactorItems.extensionCode],
  model : [this.selectedAssayWeightsFactorItems.model],
  planYear : [this.selectedAssayWeightsFactorItems.planYear],
  pricingYear : [this.selectedAssayWeightsFactorItems.pricingYear],
  testCode : [this.selectedAssayWeightsFactorItems.testCode],
  itemName : [this.selectedAssayWeightsFactorItems.itemName],
  constructionType : [this.selectedAssayWeightsFactorItems.constructionType],
  jobType : [this.selectedAssayWeightsFactorItems.jobType],
  itemCode : [this.selectedAssayWeightsFactorItems.itemCode]
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
    return this.assayWeightsFactorItemsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayWeightsFactorItemsForm.controls)) {
      this.assayWeightsFactorItemsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

