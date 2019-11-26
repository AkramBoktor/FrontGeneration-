
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IntroducingExceptionForBranchesEngineer } from 'app/shared/models/introducing-exception-for-branches-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingExceptionForBranchesEngineerService } from '../shared/introducing-exception-for-branches-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-introducing-exception-for-branches-engineer-new',
  templateUrl: './introducing-exception-for-branches-engineer-new.component.html',
  styleUrls: ['./introducing-exception-for-branches-engineer-new.component.scss'],
  providers: [
    ]
})

export class IntroducingExceptionForBranchesEngineerNewComponent extends AppBaseComponent implements OnInit {
  introducingExceptionForBranchesEngineerForm: FormGroup;
  @Input() selectedIntroducingExceptionForBranchesEngineer: IntroducingExceptionForBranchesEngineer;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IntroducingExceptionForBranchesEngineerNewComponent>,
    public introducingExceptionForBranchesEngineerService: IntroducingExceptionForBranchesEngineerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingExceptionForBranchesEngineer = new IntroducingExceptionForBranchesEngineer();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
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


    this.introducingExceptionForBranchesEngineerForm = this.formBuilder.group({
     
  id : [0],
  executiveEngineerNumber : [this.selectedIntroducingExceptionForBranchesEngineer.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedIntroducingExceptionForBranchesEngineer.schoolNumber, [ Validators.required ]],
  attachedNumber : [this.selectedIntroducingExceptionForBranchesEngineer.attachedNumber, [ Validators.required ]],
  yearPlan : [this.selectedIntroducingExceptionForBranchesEngineer.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedIntroducingExceptionForBranchesEngineer.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedIntroducingExceptionForBranchesEngineer.supervisionBeginningDate, [ Validators.required ]],
  type : [this.selectedIntroducingExceptionForBranchesEngineer.type, [ Validators.required ]],
  branchCode : [this.selectedIntroducingExceptionForBranchesEngineer.branchCode, [ Validators.required ]],
  constructionType : [this.selectedIntroducingExceptionForBranchesEngineer.constructionType, [ Validators.required ]],
  offeringType : [this.selectedIntroducingExceptionForBranchesEngineer.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.introducingExceptionForBranchesEngineerService.create(this.introducingExceptionForBranchesEngineerForm.value)
        .pipe(switchMap(x => {
			return this.introducingExceptionForBranchesEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.introducingExceptionForBranchesEngineerForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
