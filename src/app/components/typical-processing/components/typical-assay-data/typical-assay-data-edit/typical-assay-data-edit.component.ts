
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalAssayData } from 'app/shared/models/typical-assay-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalAssayDataService } from '../shared/typical-assay-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-assay-data-edit',
  templateUrl: './typical-assay-data-edit.component.html',
  styleUrls: ['./typical-assay-data-edit.component.scss'],
  providers: []
})

export class TypicalAssayDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalAssayData: TypicalAssayData;
  typicalAssayDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTermsService: LookupService;
private offeringMethodsService: LookupService;
private processingTypesService: LookupService;
private conditionCodesService: LookupService;

  
offeringTermsSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
conditionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringTerms', { static: true }) OfferingTermsSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('conditionCode', { static: true }) ConditionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalAssayDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayDataEditComponent>,
    public typicalAssayDataService: TypicalAssayDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayData = new TypicalAssayData();
    this.selectedTypicalAssayData = this.selectedTypicalAssayDataDialog.data || this.selectedTypicalAssayData;

    
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

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.conditionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.conditionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الشرط',
	});


    this.typicalAssayDataForm = this.formBuilder.group({
      
  id : [this.selectedTypicalAssayData.id],
  supplyingDuration : [this.selectedTypicalAssayData.supplyingDuration, [ ]],
  assayNumber : [this.selectedTypicalAssayData.assayNumber, [ ]],
  offeringTerms : [this.selectedTypicalAssayData.offeringTerms, [ ]],
  offeringMethod : [this.selectedTypicalAssayData.offeringMethod, [ ]],
  processingType : [this.selectedTypicalAssayData.processingType, [ Validators.required ]],
  conditionCode : [this.selectedTypicalAssayData.conditionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalAssayDataService.update(this.typicalAssayDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalAssayDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalAssayDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTermsService = new LookupService('offeringterms', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.conditionCodesService = new LookupService('conditioncodes', this.http);
  }
}
