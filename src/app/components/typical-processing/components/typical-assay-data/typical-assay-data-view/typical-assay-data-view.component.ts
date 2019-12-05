
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalAssayData } from 'app/shared/models/typical-assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalAssayDataService } from '../shared/typical-assay-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-assay-data-view',
  templateUrl: './typical-assay-data-view.component.html',
  styleUrls: ['./typical-assay-data-view.component.scss'],
  providers: []
})

export class TypicalAssayDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalAssayData: TypicalAssayData;
  typicalAssayDataForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTermsService: LookupService;
private offeringMethodsService: LookupService;
private conditionCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTermsSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
conditionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalAssayDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayDataViewComponent>,
    public typicalAssayDataService: TypicalAssayDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayData = this.selectedTypicalAssayDataDialog.data || this.selectedTypicalAssayData;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.conditionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.conditionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الشرط',
	});


    this.typicalAssayDataForm = this.formBuilder.group({
      
  assayNumber : [this.selectedTypicalAssayData.assayNumber],
  supplyingDuration : [this.selectedTypicalAssayData.supplyingDuration],
  processingType : [this.selectedTypicalAssayData.processingType],
  offeringTerms : [this.selectedTypicalAssayData.offeringTerms],
  offeringMethod : [this.selectedTypicalAssayData.offeringMethod],
  conditionCode : [this.selectedTypicalAssayData.conditionCode]
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
    return this.typicalAssayDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalAssayDataForm.controls)) {
      this.typicalAssayDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.conditionCodesService = new LookupService('conditioncodes', this.http);
  }
}

