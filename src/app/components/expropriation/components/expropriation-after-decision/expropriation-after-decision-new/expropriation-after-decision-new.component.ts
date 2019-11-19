
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExpropriationAfterDecision } from 'app/shared/models/expropriation-after-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationAfterDecisionService } from '../shared/expropriation-after-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-after-decision-new',
  templateUrl: './expropriation-after-decision-new.component.html',
  styleUrls: ['./expropriation-after-decision-new.component.scss'],
  providers: [
    ]
})

export class ExpropriationAfterDecisionNewComponent extends AppBaseComponent implements OnInit {
  expropriationAfterDecisionForm: FormGroup;
  @Input() selectedExpropriationAfterDecision: ExpropriationAfterDecision;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('resolutionNumber', { static: true }) ResolutionNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExpropriationAfterDecisionNewComponent>,
    public expropriationAfterDecisionService: ExpropriationAfterDecisionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationAfterDecision = new ExpropriationAfterDecision();

    
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


    this.expropriationAfterDecisionForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedExpropriationAfterDecision.buildingCode, [ Validators.required ]],
  dateOfBecision : [this.selectedExpropriationAfterDecision.dateOfBecision, [ Validators.required ]],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.numberOfPublicationInTheOfficialGazette, [ Validators.required ]],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.dateOfPublicationInTheOfficialGazette, [ Validators.required ]],
  educationProject : [this.selectedExpropriationAfterDecision.educationProject, [ Validators.required ]],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationAfterDecision.theNumberOfOwnersInThePresentationStatements, [ Validators.required ]],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationAfterDecision.thePriceOfAMeterInTheSupplyStatements, [ Validators.required ]],
  dateFromThePresentationLists : [this.selectedExpropriationAfterDecision.dateFromThePresentationLists, [ Validators.required ]],
  dateToOfThePresentationStatements : [this.selectedExpropriationAfterDecision.dateToOfThePresentationStatements, [ Validators.required ]],
  numberOfSalesForms : [this.selectedExpropriationAfterDecision.numberOfSalesForms, [ Validators.required ]],
  branchCode : [this.selectedExpropriationAfterDecision.branchCode, [ Validators.required ]],
  resolutionNumber : [this.selectedExpropriationAfterDecision.resolutionNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.expropriationAfterDecisionService.create(this.expropriationAfterDecisionForm.value)
        .pipe(switchMap(x => {
			return this.expropriationAfterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.expropriationAfterDecisionForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
 }
