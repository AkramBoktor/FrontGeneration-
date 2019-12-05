
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CastingDataForSampleForTheWorkOfOthers } from 'app/shared/models/casting-data-for-sample-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CastingDataForSampleForTheWorkOfOthersService } from '../shared/casting-data-for-sample-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-casting-data-for-sample-for-the-work-of-others-new',
  templateUrl: './casting-data-for-sample-for-the-work-of-others-new.component.html',
  styleUrls: ['./casting-data-for-sample-for-the-work-of-others-new.component.scss'],
  providers: [
    ]
})

export class CastingDataForSampleForTheWorkOfOthersNewComponent extends AppBaseComponent implements OnInit {
  castingDataForSampleForTheWorkOfOthersForm: FormGroup;
  @Input() selectedCastingDataForSampleForTheWorkOfOthers: CastingDataForSampleForTheWorkOfOthers;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CastingDataForSampleForTheWorkOfOthersNewComponent>,
    public castingDataForSampleForTheWorkOfOthersService: CastingDataForSampleForTheWorkOfOthersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCastingDataForSampleForTheWorkOfOthers = new CastingDataForSampleForTheWorkOfOthers();

    
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
     
  id : [0],
  structuralElementName : [this.selectedCastingDataForSampleForTheWorkOfOthers.structuralElementName, [ Validators.required ]],
  castingHistory : [this.selectedCastingDataForSampleForTheWorkOfOthers.castingHistory, [ Validators.required ]],
  testOrderNumber : [this.selectedCastingDataForSampleForTheWorkOfOthers.testOrderNumber, [ Validators.required ]],
  constructionType : [this.selectedCastingDataForSampleForTheWorkOfOthers.constructionType, [ Validators.required ]],
  elementCode : [this.selectedCastingDataForSampleForTheWorkOfOthers.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.castingDataForSampleForTheWorkOfOthersService.create(this.castingDataForSampleForTheWorkOfOthersForm.value)
        .pipe(switchMap(x => {
			return this.castingDataForSampleForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.castingDataForSampleForTheWorkOfOthersForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
 }
