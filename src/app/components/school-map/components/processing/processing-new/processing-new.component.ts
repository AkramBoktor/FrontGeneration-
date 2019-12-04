
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Processing } from 'app/shared/models/processing';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProcessingService } from '../shared/processing.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-processing-new',
  templateUrl: './processing-new.component.html',
  styleUrls: ['./processing-new.component.scss'],
  providers: [
    ]
})

export class ProcessingNewComponent extends AppBaseComponent implements OnInit {
  processingForm: FormGroup;
  @Input() selectedProcessing: Processing;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('spaceCode', { static: true }) SpaceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingState', { static: true }) ProcessingStateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ProcessingNewComponent>,
    public processingService: ProcessingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProcessing = new Processing();

    
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
     
  id : [0],
  buildingCode : [this.selectedProcessing.buildingCode, [ Validators.required ]],
  serialSupplement : [this.selectedProcessing.serialSupplement, [ Validators.required ]],
  floorNumber : [this.selectedProcessing.floorNumber, [ Validators.required ]],
  processingNumber : [this.selectedProcessing.processingNumber, [ Validators.required ]],
  regionalCenterCode : [this.selectedProcessing.regionalCenterCode, [ ]],
  branchCode : [this.selectedProcessing.branchCode, [ ]],
  spaceCode : [this.selectedProcessing.spaceCode, [ Validators.required ]],
  processingType : [this.selectedProcessing.processingType, [ Validators.required ]],
  processingState : [this.selectedProcessing.processingState, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.processingService.create(this.processingForm.value)
        .pipe(switchMap(x => {
			return this.processingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.processingForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.processingStatesService = new LookupService('processingstates', this.http);
  }
 }
