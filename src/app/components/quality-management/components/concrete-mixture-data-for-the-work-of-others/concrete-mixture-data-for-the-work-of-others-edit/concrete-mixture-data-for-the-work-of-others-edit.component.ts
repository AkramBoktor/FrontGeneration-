
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ConcreteMixtureDataForTheWorkOfOthers } from 'app/shared/models/concrete-mixture-data-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ConcreteMixtureDataForTheWorkOfOthersService } from '../shared/concrete-mixture-data-for-the-work-of-others.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-concrete-mixture-data-for-the-work-of-others-edit',
  templateUrl: './concrete-mixture-data-for-the-work-of-others-edit.component.html',
  styleUrls: ['./concrete-mixture-data-for-the-work-of-others-edit.component.scss'],
  providers: []
})

export class ConcreteMixtureDataForTheWorkOfOthersEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConcreteMixtureDataForTheWorkOfOthers: ConcreteMixtureDataForTheWorkOfOthers;
  concreteMixtureDataForTheWorkOfOthersForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sandGradientAreaesService: LookupService;
private mixtureTypesService: LookupService;
private cementUsedTypesService: LookupService;

  
sandGradientAreaSelectOptions: MaterialSelectOptions;
mixtureTypeSelectOptions: MaterialSelectOptions;
cementUsedSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sandGradientArea', { static: true }) SandGradientAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('mixtureType', { static: true }) MixtureTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('cementUsed', { static: true }) CementUsedSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConcreteMixtureDataForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataForTheWorkOfOthersEditComponent>,
    public concreteMixtureDataForTheWorkOfOthersService: ConcreteMixtureDataForTheWorkOfOthersService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureDataForTheWorkOfOthers = new ConcreteMixtureDataForTheWorkOfOthers();
    this.selectedConcreteMixtureDataForTheWorkOfOthers = this.selectedConcreteMixtureDataForTheWorkOfOthersDialog.data || this.selectedConcreteMixtureDataForTheWorkOfOthers;

    
	this.sandGradientAreaSelectOptions = new MaterialSelectOptions({
	 data: this.sandGradientAreaesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمل تدرج منطقه',
	});

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


    this.concreteMixtureDataForTheWorkOfOthersForm = this.formBuilder.group({
      
  id : [this.selectedConcreteMixtureDataForTheWorkOfOthers.id],
  sandVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandVolume, [ Validators.required ]],
  dolomiteStones : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteStones, [ Validators.required ]],
  cementWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementWeight, [ Validators.required ]],
  cementBulk : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementBulk, [ Validators.required ]],
  waterWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterWeight, [ Validators.required ]],
  waterVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterVolume, [ Validators.required ]],
  sandWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeight, [ Validators.required ]],
  stonesWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeight, [ Validators.required ]],
  stonesVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesVolume, [ Validators.required ]],
  dolomiteVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteVolume, [ Validators.required ]],
  sandSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandSpecificWeight, [ Validators.required ]],
  stonesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesSpecificWeight, [ Validators.required ]],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteSpecificWeight, [ Validators.required ]],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.aggregatesSpecificWeight, [ Validators.required ]],
  laboratoryLanding : [this.selectedConcreteMixtureDataForTheWorkOfOthers.laboratoryLanding, [ Validators.required ]],
  sandWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeightVolume, [ Validators.required ]],
  dolomiteWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeightVolume, [ Validators.required ]],
  stonesWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeightVolume, [ Validators.required ]],
  stonesCrush : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesCrush, [ Validators.required ]],
  orderNumber : [this.selectedConcreteMixtureDataForTheWorkOfOthers.orderNumber, [ Validators.required ]],
  dolomiteWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeight, [ Validators.required ]],
  sandGradientArea : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandGradientArea, [ Validators.required ]],
  mixtureType : [this.selectedConcreteMixtureDataForTheWorkOfOthers.mixtureType, [ Validators.required ]],
  cementUsed : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementUsed, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.concreteMixtureDataForTheWorkOfOthersService.update(this.concreteMixtureDataForTheWorkOfOthersForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.concreteMixtureDataForTheWorkOfOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.concreteMixtureDataForTheWorkOfOthersForm.get(name);
  }

  initializeLookupServices() {
    this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
  }
}
