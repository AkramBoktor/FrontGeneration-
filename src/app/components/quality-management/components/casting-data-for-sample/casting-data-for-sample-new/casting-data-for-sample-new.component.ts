
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CastingDataForSample } from 'app/shared/models/casting-data-for-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CastingDataForSampleService } from '../shared/casting-data-for-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-casting-data-for-sample-new',
  templateUrl: './casting-data-for-sample-new.component.html',
  styleUrls: ['./casting-data-for-sample-new.component.scss'],
  providers: [
    ]
})

export class CastingDataForSampleNewComponent extends AppBaseComponent implements OnInit {
  castingDataForSampleForm: FormGroup;
  @Input() selectedCastingDataForSample: CastingDataForSample;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleNewComponent>,
    public castingDataForSampleService: CastingDataForSampleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSample = new CastingDataForSample();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.castingDataForSampleForm = this.formBuilder.group({
     
  id : [0],
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
    this.castingDataForSampleService.create(this.castingDataForSampleForm.value)
        .pipe(switchMap(x => {
			return this.castingDataForSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.castingDataForSampleForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
