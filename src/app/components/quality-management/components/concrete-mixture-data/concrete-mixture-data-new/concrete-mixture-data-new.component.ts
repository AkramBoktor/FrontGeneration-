
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ConcreteMixtureData } from 'app/shared/models/concrete-mixture-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConcreteMixtureDataService } from '../shared/concrete-mixture-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-concrete-mixture-data-new',
  templateUrl: './concrete-mixture-data-new.component.html',
  styleUrls: ['./concrete-mixture-data-new.component.scss'],
  providers: [
    ]
})

export class ConcreteMixtureDataNewComponent extends AppBaseComponent implements OnInit {
  concreteMixtureDataForm: FormGroup;
  @Input() selectedConcreteMixtureData: ConcreteMixtureData;
  errorMessages: FormControlError[] = [
        
  ];

  private mixtureTypesService: LookupService;
private cementUsedTypesService: LookupService;
private sandGradientAreaesService: LookupService;

  
mixtureTypeSelectOptions: MaterialSelectOptions;
cementUsedSelectOptions: MaterialSelectOptions;
sandGradientAreaSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mixtureType', { static: true }) MixtureTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('cementUsed', { static: true }) CementUsedSelectComponent: MaterialSelectComponent;
	@ViewChild('sandGradientArea', { static: true }) SandGradientAreaSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataNewComponent>,
    public concreteMixtureDataService: ConcreteMixtureDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureData = new ConcreteMixtureData();

    
	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});

	this.cementUsedSelectOptions = new MaterialSelectOptions({
	 data: this.cementUsedTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاسمنت المستخدم',
	});

	this.sandGradientAreaSelectOptions = new MaterialSelectOptions({
	 data: this.sandGradientAreaesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمل تدرج منطقه',
	});


    this.concreteMixtureDataForm = this.formBuilder.group({
     
  id : [0],
  orderNumber : [this.selectedConcreteMixtureData.orderNumber, [ Validators.required ]],
  cementWeight : [this.selectedConcreteMixtureData.cementWeight, [ Validators.required ]],
  cementBulk : [this.selectedConcreteMixtureData.cementBulk, [ Validators.required ]],
  waterWeight : [this.selectedConcreteMixtureData.waterWeight, [ Validators.required ]],
  waterVolume : [this.selectedConcreteMixtureData.waterVolume, [ Validators.required ]],
  sandWeight : [this.selectedConcreteMixtureData.sandWeight, [ Validators.required ]],
  sandVolume : [this.selectedConcreteMixtureData.sandVolume, [ Validators.required ]],
  stonesWeight : [this.selectedConcreteMixtureData.stonesWeight, [ Validators.required ]],
  stonesVolume : [this.selectedConcreteMixtureData.stonesVolume, [ Validators.required ]],
  dolomiteWeight : [this.selectedConcreteMixtureData.dolomiteWeight, [ Validators.required ]],
  dolomiteVolume : [this.selectedConcreteMixtureData.dolomiteVolume, [ Validators.required ]],
  sandSpecificWeight : [this.selectedConcreteMixtureData.sandSpecificWeight, [ Validators.required ]],
  stonesSpecificWeight : [this.selectedConcreteMixtureData.stonesSpecificWeight, [ Validators.required ]],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureData.dolomiteSpecificWeight, [ Validators.required ]],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureData.aggregatesSpecificWeight, [ Validators.required ]],
  laboratoryLanding : [this.selectedConcreteMixtureData.laboratoryLanding, [ Validators.required ]],
  sandWeightVolume : [this.selectedConcreteMixtureData.sandWeightVolume, [ Validators.required ]],
  dolomiteWeightVolume : [this.selectedConcreteMixtureData.dolomiteWeightVolume, [ Validators.required ]],
  stonesWeightVolume : [this.selectedConcreteMixtureData.stonesWeightVolume, [ Validators.required ]],
  stonesCrush : [this.selectedConcreteMixtureData.stonesCrush, [ Validators.required ]],
  dolomiteStones : [this.selectedConcreteMixtureData.dolomiteStones, [ Validators.required ]],
  mixtureType : [this.selectedConcreteMixtureData.mixtureType, [ Validators.required ]],
  cementUsed : [this.selectedConcreteMixtureData.cementUsed, [ Validators.required ]],
  sandGradientArea : [this.selectedConcreteMixtureData.sandGradientArea, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.concreteMixtureDataService.create(this.concreteMixtureDataForm.value)
        .pipe(switchMap(x => {
			return this.concreteMixtureDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.concreteMixtureDataForm.get(name);
    }

  initializeLookupServices() {
    this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
  }
 }
