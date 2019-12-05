
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CastingDataForSample } from 'app/shared/models/casting-data-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CastingDataForSampleService } from '../shared/casting-data-for-sample.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-casting-data-for-sample-edit',
  templateUrl: './casting-data-for-sample-edit.component.html',
  styleUrls: ['./casting-data-for-sample-edit.component.scss'],
  providers: []
})

export class CastingDataForSampleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCastingDataForSample: CastingDataForSample;
  castingDataForSampleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCastingDataForSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleEditComponent>,
    public castingDataForSampleService: CastingDataForSampleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSample = new CastingDataForSample();
    this.selectedCastingDataForSample = this.selectedCastingDataForSampleDialog.data || this.selectedCastingDataForSample;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.castingDataForSampleForm = this.formBuilder.group({
      
  id : [this.selectedCastingDataForSample.id],
  testOrderNumber : [this.selectedCastingDataForSample.testOrderNumber, [ Validators.required ]],
  elementCode : [this.selectedCastingDataForSample.elementCode, [ Validators.required ]],
  castingHistory : [this.selectedCastingDataForSample.castingHistory, [ Validators.required ]],
  structuralElementName : [this.selectedCastingDataForSample.structuralElementName, [ Validators.required ]],
  constructionType : [this.selectedCastingDataForSample.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.castingDataForSampleService.update(this.castingDataForSampleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.castingDataForSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.castingDataForSampleForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
