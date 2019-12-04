
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BusinessAssayForOthers } from 'app/shared/models/business-assay-for-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BusinessAssayForOthersService } from '../shared/business-assay-for-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-business-assay-for-others-view',
  templateUrl: './business-assay-for-others-view.component.html',
  styleUrls: ['./business-assay-for-others-view.component.scss'],
  providers: []
})

export class BusinessAssayForOthersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBusinessAssayForOthers: BusinessAssayForOthers;
  businessAssayForOthersForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBusinessAssayForOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<BusinessAssayForOthersViewComponent>,
    public businessAssayForOthersService: BusinessAssayForOthersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessAssayForOthers = this.selectedBusinessAssayForOthersDialog.data || this.selectedBusinessAssayForOthers;

    
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

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.businessAssayForOthersForm = this.formBuilder.group({
      
  buildingCode : [this.selectedBusinessAssayForOthers.buildingCode],
  modelCode : [this.selectedBusinessAssayForOthers.modelCode],
  planYear : [this.selectedBusinessAssayForOthers.planYear],
  pricingYear : [this.selectedBusinessAssayForOthers.pricingYear],
  itemName : [this.selectedBusinessAssayForOthers.itemName],
  quantity : [this.selectedBusinessAssayForOthers.quantity],
  price : [this.selectedBusinessAssayForOthers.price],
  constructionType : [this.selectedBusinessAssayForOthers.constructionType],
  employmentType : [this.selectedBusinessAssayForOthers.employmentType],
  itemCode : [this.selectedBusinessAssayForOthers.itemCode]
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
    return this.businessAssayForOthersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.businessAssayForOthersForm.controls)) {
      this.businessAssayForOthersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

