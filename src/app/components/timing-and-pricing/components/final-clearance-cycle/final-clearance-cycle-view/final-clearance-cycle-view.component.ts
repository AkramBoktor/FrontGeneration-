
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FinalClearanceCycle } from 'app/shared/models/final-clearance-cycle';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FinalClearanceCycleService } from '../shared/final-clearance-cycle.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-final-clearance-cycle-view',
  templateUrl: './final-clearance-cycle-view.component.html',
  styleUrls: ['./final-clearance-cycle-view.component.scss'],
  providers: []
})

export class FinalClearanceCycleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinalClearanceCycle: FinalClearanceCycle;
  finalClearanceCycleForm: FormGroup;

  private governoratesService: LookupService;
private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private extractTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
abstractPositionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinalClearanceCycleDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinalClearanceCycleViewComponent>,
    public finalClearanceCycleService: FinalClearanceCycleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinalClearanceCycle = this.selectedFinalClearanceCycleDialog.data || this.selectedFinalClearanceCycle;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.abstractPositionSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف المستخلص',
	});


    this.finalClearanceCycleForm = this.formBuilder.group({
      
  buildingCode : [this.selectedFinalClearanceCycle.buildingCode],
  schoolName : [this.selectedFinalClearanceCycle.schoolName],
  bidNumber : [this.selectedFinalClearanceCycle.bidNumber],
  contractorCode : [this.selectedFinalClearanceCycle.contractorCode],
  contractorName : [this.selectedFinalClearanceCycle.contractorName],
  engineerCode : [this.selectedFinalClearanceCycle.engineerCode],
  engineerName : [this.selectedFinalClearanceCycle.engineerName],
  primaryDeliveryDate : [this.selectedFinalClearanceCycle.primaryDeliveryDate],
  incomingDate : [this.selectedFinalClearanceCycle.incomingDate],
  numberOfTimesReceived : [this.selectedFinalClearanceCycle.numberOfTimesReceived],
  portfolioNumber : [this.selectedFinalClearanceCycle.portfolioNumber],
  approvalsNumber : [this.selectedFinalClearanceCycle.approvalsNumber],
  referenceCode : [this.selectedFinalClearanceCycle.referenceCode],
  referencesName : [this.selectedFinalClearanceCycle.referencesName],
  departureTechnicalOfficeDate : [this.selectedFinalClearanceCycle.departureTechnicalOfficeDate],
  exchangeAuthoritiesDate : [this.selectedFinalClearanceCycle.exchangeAuthoritiesDate],
  outboundNumber : [this.selectedFinalClearanceCycle.outboundNumber],
  governorate : [this.selectedFinalClearanceCycle.governorate],
  offeringType : [this.selectedFinalClearanceCycle.offeringType],
  constructionType : [this.selectedFinalClearanceCycle.constructionType],
  abstractPosition : [this.selectedFinalClearanceCycle.abstractPosition]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.finalClearanceCycleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.finalClearanceCycleForm.controls)) {
      this.finalClearanceCycleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
}

