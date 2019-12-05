
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CastingDataForSampleForTheWorkOfOthers } from 'app/shared/models/casting-data-for-sample-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CastingDataForSampleForTheWorkOfOthersService } from '../shared/casting-data-for-sample-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-casting-data-for-sample-for-the-work-of-others-view',
  templateUrl: './casting-data-for-sample-for-the-work-of-others-view.component.html',
  styleUrls: ['./casting-data-for-sample-for-the-work-of-others-view.component.scss'],
  providers: []
})

export class CastingDataForSampleForTheWorkOfOthersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCastingDataForSampleForTheWorkOfOthers: CastingDataForSampleForTheWorkOfOthers;
  castingDataForSampleForTheWorkOfOthersForm: FormGroup;

  private constructionTypesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCastingDataForSampleForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleForTheWorkOfOthersViewComponent>,
    public castingDataForSampleForTheWorkOfOthersService: CastingDataForSampleForTheWorkOfOthersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSampleForTheWorkOfOthers = this.selectedCastingDataForSampleForTheWorkOfOthersDialog.data || this.selectedCastingDataForSampleForTheWorkOfOthers;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.castingDataForSampleForTheWorkOfOthersForm = this.formBuilder.group({
      
  structuralElementName : [this.selectedCastingDataForSampleForTheWorkOfOthers.structuralElementName],
  castingHistory : [this.selectedCastingDataForSampleForTheWorkOfOthers.castingHistory],
  testOrderNumber : [this.selectedCastingDataForSampleForTheWorkOfOthers.testOrderNumber],
  constructionType : [this.selectedCastingDataForSampleForTheWorkOfOthers.constructionType],
  elementCode : [this.selectedCastingDataForSampleForTheWorkOfOthers.elementCode]
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
    return this.castingDataForSampleForTheWorkOfOthersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.castingDataForSampleForTheWorkOfOthersForm.controls)) {
      this.castingDataForSampleForTheWorkOfOthersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

