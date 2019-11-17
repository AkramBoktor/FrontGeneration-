
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExpropriationDataAfterThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-after-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationDataAfterThePrimeMinisterDecisionService } from '../shared/expropriation-data-after-the-prime-minister-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-data-after-the-prime-minister-decision-new',
  templateUrl: './expropriation-data-after-the-prime-minister-decision-new.component.html',
  styleUrls: ['./expropriation-data-after-the-prime-minister-decision-new.component.scss'],
  providers: [
    ]
})

export class ExpropriationDataAfterThePrimeMinisterDecisionNewComponent extends AppBaseComponent implements OnInit {
  expropriationDataAfterThePrimeMinisterDecisionForm: FormGroup;
  @Input() selectedExpropriationDataAfterThePrimeMinisterDecision: ExpropriationDataAfterThePrimeMinisterDecision;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('resolutionNumber', { static: true }) ResolutionNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataAfterThePrimeMinisterDecisionNewComponent>,
    public expropriationDataAfterThePrimeMinisterDecisionService: ExpropriationDataAfterThePrimeMinisterDecisionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationDataAfterThePrimeMinisterDecision = new ExpropriationDataAfterThePrimeMinisterDecision();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.resolutionNumberSelectOptions = new MaterialSelectOptions({
	 data: this.decisionNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم القرار',
	});


    this.expropriationDataAfterThePrimeMinisterDecisionForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.buildingCode, [ Validators.required ]],
  dateOfBecision : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfBecision, [ Validators.required ]],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfPublicationInTheOfficialGazette, [ Validators.required ]],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfPublicationInTheOfficialGazette, [ Validators.required ]],
  educationProject : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.educationProject, [ Validators.required ]],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.theNumberOfOwnersInThePresentationStatements, [ Validators.required ]],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.thePriceOfAMeterInTheSupplyStatements, [ Validators.required ]],
  dateFromThePresentationLists : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateFromThePresentationLists, [ Validators.required ]],
  dateToOfThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateToOfThePresentationStatements, [ Validators.required ]],
  numberOfSalesForms : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfSalesForms, [ Validators.required ]],
  branchCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.branchCode, [ Validators.required ]],
  resolutionNumber : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.resolutionNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.expropriationDataAfterThePrimeMinisterDecisionService.create(this.expropriationDataAfterThePrimeMinisterDecisionForm.value)
        .pipe(switchMap(x => {
			return this.expropriationDataAfterThePrimeMinisterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.expropriationDataAfterThePrimeMinisterDecisionForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
 }
