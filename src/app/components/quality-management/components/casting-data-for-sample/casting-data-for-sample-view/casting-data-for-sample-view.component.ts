
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CastingDataForSample } from 'app/shared/models/casting-data-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CastingDataForSampleService } from '../shared/casting-data-for-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-casting-data-for-sample-view',
  templateUrl: './casting-data-for-sample-view.component.html',
  styleUrls: ['./casting-data-for-sample-view.component.scss'],
  providers: []
})

export class CastingDataForSampleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCastingDataForSample: CastingDataForSample;
  castingDataForSampleForm: FormGroup;

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCastingDataForSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleViewComponent>,
    public castingDataForSampleService: CastingDataForSampleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSample = this.selectedCastingDataForSampleDialog.data || this.selectedCastingDataForSample;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.castingDataForSampleForm = this.formBuilder.group({
      
  testOrderNumber : [this.selectedCastingDataForSample.testOrderNumber],
  elementCode : [this.selectedCastingDataForSample.elementCode],
  castingHistory : [this.selectedCastingDataForSample.castingHistory],
  structuralElementName : [this.selectedCastingDataForSample.structuralElementName],
  constructionType : [this.selectedCastingDataForSample.constructionType]
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
    return this.castingDataForSampleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.castingDataForSampleForm.controls)) {
      this.castingDataForSampleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

