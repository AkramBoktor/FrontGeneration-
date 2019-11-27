
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EndingPlacementOfExecutiveEngineer } from 'app/shared/models/ending-placement-of-executive-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndingPlacementOfExecutiveEngineerService } from '../shared/ending-placement-of-executive-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-ending-placement-of-executive-engineer-new',
  templateUrl: './ending-placement-of-executive-engineer-new.component.html',
  styleUrls: ['./ending-placement-of-executive-engineer-new.component.scss'],
  providers: [
    ]
})

export class EndingPlacementOfExecutiveEngineerNewComponent extends AppBaseComponent implements OnInit {
  endingPlacementOfExecutiveEngineerForm: FormGroup;
  @Input() selectedEndingPlacementOfExecutiveEngineer: EndingPlacementOfExecutiveEngineer;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private endingSupervisionReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
supervisionEndResonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('supervisionEndReson', { static: true }) SupervisionEndResonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EndingPlacementOfExecutiveEngineerNewComponent>,
    public endingPlacementOfExecutiveEngineerService: EndingPlacementOfExecutiveEngineerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndingPlacementOfExecutiveEngineer = new EndingPlacementOfExecutiveEngineer();

    
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

	this.supervisionEndResonSelectOptions = new MaterialSelectOptions({
	 data: this.endingSupervisionReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب انهاء الاشراف',
	});


    this.endingPlacementOfExecutiveEngineerForm = this.formBuilder.group({
     
  id : [0],
  executiveEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedEndingPlacementOfExecutiveEngineer.schoolNumber, [ Validators.required ]],
  atthachEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.atthachEngineerNumber, [ Validators.required ]],
  yearPlan : [this.selectedEndingPlacementOfExecutiveEngineer.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedEndingPlacementOfExecutiveEngineer.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionBeginningDate, [ ]],
  supervisionEndDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndDate, [ ]],
  branchCode : [this.selectedEndingPlacementOfExecutiveEngineer.branchCode, [ Validators.required ]],
  constructionType : [this.selectedEndingPlacementOfExecutiveEngineer.constructionType, [ Validators.required ]],
  offeringType : [this.selectedEndingPlacementOfExecutiveEngineer.offeringType, [ Validators.required ]],
  supervisionEndReson : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndReson, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.endingPlacementOfExecutiveEngineerService.create(this.endingPlacementOfExecutiveEngineerForm.value)
        .pipe(switchMap(x => {
			return this.endingPlacementOfExecutiveEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.endingPlacementOfExecutiveEngineerForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.endingSupervisionReasonsService = new LookupService('endingsupervisionreasons', this.http);
  }
 }
