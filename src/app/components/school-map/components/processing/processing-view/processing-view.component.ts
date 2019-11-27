
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Processing } from 'app/shared/models/processing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ProcessingService } from '../shared/processing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-processing-view',
  templateUrl: './processing-view.component.html',
  styleUrls: ['./processing-view.component.scss'],
  providers: []
})

export class ProcessingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProcessing: Processing;
  processingForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private educationalSpacesService: LookupService;
private processingTypesService: LookupService;
private processingStatesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
spaceCodeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
processingStateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProcessingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProcessingViewComponent>,
    public processingService: ProcessingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProcessing = this.selectedProcessingDialog.data || this.selectedProcessing;

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.spaceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalSpacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفراغ',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.processingStateSelectOptions = new MaterialSelectOptions({
	 data: this.processingStatesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحاله للتجهيز',
	});


    this.processingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedProcessing.buildingCode],
  serialSupplement : [this.selectedProcessing.serialSupplement],
  floorNumber : [this.selectedProcessing.floorNumber],
  processingNumber : [this.selectedProcessing.processingNumber],
  regionalCenterCode : [this.selectedProcessing.regionalCenterCode],
  branchCode : [this.selectedProcessing.branchCode],
  spaceCode : [this.selectedProcessing.spaceCode],
  processingType : [this.selectedProcessing.processingType],
  processingState : [this.selectedProcessing.processingState]
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
    return this.processingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.processingForm.controls)) {
      this.processingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.processingStatesService = new LookupService('processingstates', this.http);
  }
}

