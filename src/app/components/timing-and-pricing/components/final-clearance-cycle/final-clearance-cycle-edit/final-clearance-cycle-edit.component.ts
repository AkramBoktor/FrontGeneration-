
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinalClearanceCycle } from 'app/shared/models/final-clearance-cycle';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FinalClearanceCycleService } from '../shared/final-clearance-cycle.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-final-clearance-cycle-edit',
  templateUrl: './final-clearance-cycle-edit.component.html',
  styleUrls: ['./final-clearance-cycle-edit.component.scss'],
  providers: []
})

export class FinalClearanceCycleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinalClearanceCycle: FinalClearanceCycle;
  finalClearanceCycleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private extractTypesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private governoratesService: LookupService;

  
abstractPositionSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('abstractPosition', { static: true }) AbstractPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinalClearanceCycleDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinalClearanceCycleEditComponent>,
    public finalClearanceCycleService: FinalClearanceCycleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinalClearanceCycle = new FinalClearanceCycle();
    this.selectedFinalClearanceCycle = this.selectedFinalClearanceCycleDialog.data || this.selectedFinalClearanceCycle;

    
	this.abstractPositionSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف المستخلص',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.finalClearanceCycleForm = this.formBuilder.group({
      
  id : [this.selectedFinalClearanceCycle.id],
  buildingCode : [this.selectedFinalClearanceCycle.buildingCode, [ Validators.required ]],
  departureTechnicalOfficeDate : [this.selectedFinalClearanceCycle.departureTechnicalOfficeDate, [ Validators.required ]],
  referencesName : [this.selectedFinalClearanceCycle.referencesName, [ ]],
  referenceCode : [this.selectedFinalClearanceCycle.referenceCode, [ Validators.required ]],
  approvalsNumber : [this.selectedFinalClearanceCycle.approvalsNumber, [ Validators.required ]],
  portfolioNumber : [this.selectedFinalClearanceCycle.portfolioNumber, [ Validators.required ]],
  numberOfTimesReceived : [this.selectedFinalClearanceCycle.numberOfTimesReceived, [ Validators.required ]],
  incomingDate : [this.selectedFinalClearanceCycle.incomingDate, [ Validators.required ]],
  exchangeAuthoritiesDate : [this.selectedFinalClearanceCycle.exchangeAuthoritiesDate, [ Validators.required ]],
  engineerName : [this.selectedFinalClearanceCycle.engineerName, [ ]],
  engineerCode : [this.selectedFinalClearanceCycle.engineerCode, [ ]],
  contractorName : [this.selectedFinalClearanceCycle.contractorName, [ ]],
  contractorCode : [this.selectedFinalClearanceCycle.contractorCode, [ ]],
  bidNumber : [this.selectedFinalClearanceCycle.bidNumber, [ ]],
  schoolName : [this.selectedFinalClearanceCycle.schoolName, [ ]],
  primaryDeliveryDate : [this.selectedFinalClearanceCycle.primaryDeliveryDate, [ ]],
  outboundNumber : [this.selectedFinalClearanceCycle.outboundNumber, [ Validators.required ]],
  abstractPosition : [this.selectedFinalClearanceCycle.abstractPosition, [ Validators.required ]],
  constructionType : [this.selectedFinalClearanceCycle.constructionType, [ ]],
  offeringType : [this.selectedFinalClearanceCycle.offeringType, [ ]],
  governorate : [this.selectedFinalClearanceCycle.governorate, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.finalClearanceCycleService.update(this.finalClearanceCycleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.finalClearanceCycleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.finalClearanceCycleForm.get(name);
  }

  initializeLookupServices() {
    this.extractTypesService = new LookupService('extracttypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}
