
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ConcreteMixtureData } from 'app/shared/models/concrete-mixture-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ConcreteMixtureDataService } from '../shared/concrete-mixture-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-concrete-mixture-data-edit',
  templateUrl: './concrete-mixture-data-edit.component.html',
  styleUrls: ['./concrete-mixture-data-edit.component.scss'],
  providers: []
})

export class ConcreteMixtureDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConcreteMixtureData: ConcreteMixtureData;
  concreteMixtureDataForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConcreteMixtureDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataEditComponent>,
    public concreteMixtureDataService: ConcreteMixtureDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureData = new ConcreteMixtureData();
    this.selectedConcreteMixtureData = this.selectedConcreteMixtureDataDialog.data || this.selectedConcreteMixtureData;

    
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


    this.concreteMixtureDataForm = this.formBuilder.group({
      
  id : [this.selectedConcreteMixtureData.id],
  orderNumber : [this.selectedConcreteMixtureData.orderNumber, [ Validators.required ]],
  stonesCrush : [this.selectedConcreteMixtureData.stonesCrush, [ Validators.required ]],
  stonesWeightVolume : [this.selectedConcreteMixtureData.stonesWeightVolume, [ Validators.required ]],
  dolomiteWeightVolume : [this.selectedConcreteMixtureData.dolomiteWeightVolume, [ Validators.required ]],
  sandWeightVolume : [this.selectedConcreteMixtureData.sandWeightVolume, [ Validators.required ]],
  laboratoryLanding : [this.selectedConcreteMixtureData.laboratoryLanding, [ Validators.required ]],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureData.aggregatesSpecificWeight, [ Validators.required ]],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureData.dolomiteSpecificWeight, [ Validators.required ]],
  stonesSpecificWeight : [this.selectedConcreteMixtureData.stonesSpecificWeight, [ Validators.required ]],
  sandSpecificWeight : [this.selectedConcreteMixtureData.sandSpecificWeight, [ Validators.required ]],
  dolomiteVolume : [this.selectedConcreteMixtureData.dolomiteVolume, [ Validators.required ]],
  dolomiteWeight : [this.selectedConcreteMixtureData.dolomiteWeight, [ Validators.required ]],
  stonesVolume : [this.selectedConcreteMixtureData.stonesVolume, [ Validators.required ]],
  stonesWeight : [this.selectedConcreteMixtureData.stonesWeight, [ Validators.required ]],
  sandVolume : [this.selectedConcreteMixtureData.sandVolume, [ Validators.required ]],
  sandWeight : [this.selectedConcreteMixtureData.sandWeight, [ Validators.required ]],
  waterVolume : [this.selectedConcreteMixtureData.waterVolume, [ Validators.required ]],
  waterWeight : [this.selectedConcreteMixtureData.waterWeight, [ Validators.required ]],
  cementBulk : [this.selectedConcreteMixtureData.cementBulk, [ Validators.required ]],
  cementWeight : [this.selectedConcreteMixtureData.cementWeight, [ Validators.required ]],
  dolomiteStones : [this.selectedConcreteMixtureData.dolomiteStones, [ Validators.required ]],
  cementUsed : [this.selectedConcreteMixtureData.cementUsed, [ Validators.required ]],
  mixtureType : [this.selectedConcreteMixtureData.mixtureType, [ Validators.required ]],
  sandGradientArea : [this.selectedConcreteMixtureData.sandGradientArea, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.concreteMixtureDataService.update(this.concreteMixtureDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.concreteMixtureDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.concreteMixtureDataForm.get(name);
  }

  initializeLookupServices() {
    this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
  }
}
