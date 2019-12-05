
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayData } from 'app/shared/models/assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayDataService } from '../shared/assay-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-data-view',
  templateUrl: './assay-data-view.component.html',
  styleUrls: ['./assay-data-view.component.scss'],
  providers: []
})

export class AssayDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayData: AssayData;
  assayDataForm: FormGroup;

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTermsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTermsSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayDataViewComponent>,
    public assayDataService: AssayDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayData = this.selectedAssayDataDialog.data || this.selectedAssayData;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});


    this.assayDataForm = this.formBuilder.group({
      
  assayNumber : [this.selectedAssayData.assayNumber],
  supplyingDuration : [this.selectedAssayData.supplyingDuration],
  processingType : [this.selectedAssayData.processingType],
  offeringMethod : [this.selectedAssayData.offeringMethod],
  offeringTerms : [this.selectedAssayData.offeringTerms]
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
    return this.assayDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayDataForm.controls)) {
      this.assayDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
  }
}

