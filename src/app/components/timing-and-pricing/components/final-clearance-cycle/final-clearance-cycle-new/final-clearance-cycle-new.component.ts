
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FinalClearanceCycle } from 'app/shared/models/final-clearance-cycle';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FinalClearanceCycleService } from '../shared/final-clearance-cycle.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-final-clearance-cycle-new',
  templateUrl: './final-clearance-cycle-new.component.html',
  styleUrls: ['./final-clearance-cycle-new.component.scss'],
  providers: [
    ]
})

export class FinalClearanceCycleNewComponent extends AppBaseComponent implements OnInit {
  finalClearanceCycleForm: FormGroup;
  @Input() selectedFinalClearanceCycle: FinalClearanceCycle;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private extractTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
abstractPositionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractPosition', { static: true }) AbstractPositionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FinalClearanceCycleNewComponent>,
    public finalClearanceCycleService: FinalClearanceCycleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinalClearanceCycle = new FinalClearanceCycle();

    
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
     
  id : [0],
  buildingCode : [this.selectedFinalClearanceCycle.buildingCode, [ Validators.required ]],
  schoolName : [this.selectedFinalClearanceCycle.schoolName, [ ]],
  bidNumber : [this.selectedFinalClearanceCycle.bidNumber, [ ]],
  contractorCode : [this.selectedFinalClearanceCycle.contractorCode, [ ]],
  contractorName : [this.selectedFinalClearanceCycle.contractorName, [ ]],
  employeeCode : [this.selectedFinalClearanceCycle.employeeCode, [ ]],
  engineerName : [this.selectedFinalClearanceCycle.engineerName, [ ]],
  primaryDeliveryDate : [this.selectedFinalClearanceCycle.primaryDeliveryDate, [ ]],
  incomingDate : [this.selectedFinalClearanceCycle.incomingDate, [ Validators.required ]],
  numberOfTimesReceived : [this.selectedFinalClearanceCycle.numberOfTimesReceived, [ Validators.required ]],
  portfolioNumber : [this.selectedFinalClearanceCycle.portfolioNumber, [ Validators.required ]],
  approvalsNumber : [this.selectedFinalClearanceCycle.approvalsNumber, [ Validators.required ]],
  referenceNumber : [this.selectedFinalClearanceCycle.referenceNumber, [ Validators.required ]],
  referencesName : [this.selectedFinalClearanceCycle.referencesName, [ Validators.required ]],
  departureTechnicalOfficeDate : [this.selectedFinalClearanceCycle.departureTechnicalOfficeDate, [ Validators.required ]],
  exchangeAuthoritiesDate : [this.selectedFinalClearanceCycle.exchangeAuthoritiesDate, [ Validators.required ]],
  outboundNumber : [this.selectedFinalClearanceCycle.outboundNumber, [ Validators.required ]],
  governorate : [this.selectedFinalClearanceCycle.governorate, [ ]],
  offeringType : [this.selectedFinalClearanceCycle.offeringType, [ ]],
  constructionType : [this.selectedFinalClearanceCycle.constructionType, [ ]],
  abstractPosition : [this.selectedFinalClearanceCycle.abstractPosition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.finalClearanceCycleService.create(this.finalClearanceCycleForm.value)
        .pipe(switchMap(x => {
			return this.finalClearanceCycleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.finalClearanceCycleForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
 }
