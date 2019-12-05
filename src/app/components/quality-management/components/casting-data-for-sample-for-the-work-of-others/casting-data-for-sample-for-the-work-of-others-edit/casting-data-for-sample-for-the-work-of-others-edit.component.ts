
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CastingDataForSampleForTheWorkOfOthers } from 'app/shared/models/casting-data-for-sample-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CastingDataForSampleForTheWorkOfOthersService } from '../shared/casting-data-for-sample-for-the-work-of-others.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-casting-data-for-sample-for-the-work-of-others-edit',
  templateUrl: './casting-data-for-sample-for-the-work-of-others-edit.component.html',
  styleUrls: ['./casting-data-for-sample-for-the-work-of-others-edit.component.scss'],
  providers: []
})

export class CastingDataForSampleForTheWorkOfOthersEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCastingDataForSampleForTheWorkOfOthers: CastingDataForSampleForTheWorkOfOthers;
  castingDataForSampleForTheWorkOfOthersForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCastingDataForSampleForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleForTheWorkOfOthersEditComponent>,
    public castingDataForSampleForTheWorkOfOthersService: CastingDataForSampleForTheWorkOfOthersService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSampleForTheWorkOfOthers = new CastingDataForSampleForTheWorkOfOthers();
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
      
  id : [this.selectedCastingDataForSampleForTheWorkOfOthers.id],
  structuralElementName : [this.selectedCastingDataForSampleForTheWorkOfOthers.structuralElementName, [ Validators.required ]],
  testOrderNumber : [this.selectedCastingDataForSampleForTheWorkOfOthers.testOrderNumber, [ Validators.required ]],
  castingHistory : [this.selectedCastingDataForSampleForTheWorkOfOthers.castingHistory, [ Validators.required ]],
  constructionType : [this.selectedCastingDataForSampleForTheWorkOfOthers.constructionType, [ Validators.required ]],
  elementCode : [this.selectedCastingDataForSampleForTheWorkOfOthers.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.castingDataForSampleForTheWorkOfOthersService.update(this.castingDataForSampleForTheWorkOfOthersForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.castingDataForSampleForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.castingDataForSampleForTheWorkOfOthersForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}
