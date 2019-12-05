
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ConcreteMixtureDataForTheWorkOfOthers } from 'app/shared/models/concrete-mixture-data-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConcreteMixtureDataForTheWorkOfOthersService } from '../shared/concrete-mixture-data-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-concrete-mixture-data-for-the-work-of-others-new',
  templateUrl: './concrete-mixture-data-for-the-work-of-others-new.component.html',
  styleUrls: ['./concrete-mixture-data-for-the-work-of-others-new.component.scss'],
  providers: [
    ]
})

export class ConcreteMixtureDataForTheWorkOfOthersNewComponent extends AppBaseComponent implements OnInit {
  concreteMixtureDataForTheWorkOfOthersForm: FormGroup;
  @Input() selectedConcreteMixtureDataForTheWorkOfOthers: ConcreteMixtureDataForTheWorkOfOthers;
  errorMessages: FormControlError[] = [
        
  ];

  private cementUsedTypesService: LookupService;
private mixtureTypesService: LookupService;
private sandGradientAreaesService: LookupService;

  
cementUsedSelectOptions: MaterialSelectOptions;
mixtureTypeSelectOptions: MaterialSelectOptions;
sandGradientAreaSelectOptions: MaterialSelectOptions;

  
	@ViewChild('cementUsed', { static: true }) CementUsedSelectComponent: MaterialSelectComponent;
	@ViewChild('mixtureType', { static: true }) MixtureTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sandGradientArea', { static: true }) SandGradientAreaSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataForTheWorkOfOthersNewComponent>,
    public concreteMixtureDataForTheWorkOfOthersService: ConcreteMixtureDataForTheWorkOfOthersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureDataForTheWorkOfOthers = new ConcreteMixtureDataForTheWorkOfOthers();

    
	this.cementUsedSelectOptions = new MaterialSelectOptions({
	 data: this.cementUsedTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاسمنت المستخدم',
	});

	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});

	this.sandGradientAreaSelectOptions = new MaterialSelectOptions({
	 data: this.sandGradientAreaesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمل تدرج منطقه',
	});


    this.concreteMixtureDataForTheWorkOfOthersForm = this.formBuilder.group({
     
  id : [0],
  laboratoryLanding : [this.selectedConcreteMixtureDataForTheWorkOfOthers.laboratoryLanding, [ Validators.required ]],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.aggregatesSpecificWeight, [ Validators.required ]],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteSpecificWeight, [ Validators.required ]],
  stonesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesSpecificWeight, [ Validators.required ]],
  sandSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandSpecificWeight, [ Validators.required ]],
  dolomiteVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteVolume, [ Validators.required ]],
  dolomiteWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeight, [ Validators.required ]],
  sandWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeightVolume, [ Validators.required ]],
  stonesVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesVolume, [ Validators.required ]],
  sandVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandVolume, [ Validators.required ]],
  sandWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeight, [ Validators.required ]],
  waterVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterVolume, [ Validators.required ]],
  waterWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterWeight, [ Validators.required ]],
  cementBulk : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementBulk, [ Validators.required ]],
  cementWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementWeight, [ Validators.required ]],
  orderNumber : [this.selectedConcreteMixtureDataForTheWorkOfOthers.orderNumber, [ Validators.required ]],
  stonesWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeight, [ Validators.required ]],
  dolomiteWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeightVolume, [ Validators.required ]],
  stonesWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeightVolume, [ Validators.required ]],
  stonesCrush : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesCrush, [ Validators.required ]],
  dolomiteStones : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteStones, [ Validators.required ]],
  cementUsed : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementUsed, [ Validators.required ]],
  mixtureType : [this.selectedConcreteMixtureDataForTheWorkOfOthers.mixtureType, [ Validators.required ]],
  sandGradientArea : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandGradientArea, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.concreteMixtureDataForTheWorkOfOthersService.create(this.concreteMixtureDataForTheWorkOfOthersForm.value)
        .pipe(switchMap(x => {
			return this.concreteMixtureDataForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.concreteMixtureDataForTheWorkOfOthersForm.get(name);
    }

  initializeLookupServices() {
    this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
  }
 }
