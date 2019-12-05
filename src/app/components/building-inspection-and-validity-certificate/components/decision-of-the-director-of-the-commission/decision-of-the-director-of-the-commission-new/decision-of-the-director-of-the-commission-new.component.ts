
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DecisionOfTheDirectorOfTheCommission } from 'app/shared/models/decision-of-the-director-of-the-commission';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DecisionOfTheDirectorOfTheCommissionService } from '../shared/decision-of-the-director-of-the-commission.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-decision-of-the-director-of-the-commission-new',
  templateUrl: './decision-of-the-director-of-the-commission-new.component.html',
  styleUrls: ['./decision-of-the-director-of-the-commission-new.component.scss'],
  providers: [
    ]
})

export class DecisionOfTheDirectorOfTheCommissionNewComponent extends AppBaseComponent implements OnInit {
  decisionOfTheDirectorOfTheCommissionForm: FormGroup;
  @Input() selectedDecisionOfTheDirectorOfTheCommission: DecisionOfTheDirectorOfTheCommission;
  errorMessages: FormControlError[] = [
        
  ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DecisionOfTheDirectorOfTheCommissionNewComponent>,
    public decisionOfTheDirectorOfTheCommissionService: DecisionOfTheDirectorOfTheCommissionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDecisionOfTheDirectorOfTheCommission = new DecisionOfTheDirectorOfTheCommission();

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});


    this.decisionOfTheDirectorOfTheCommissionForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedDecisionOfTheDirectorOfTheCommission.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedDecisionOfTheDirectorOfTheCommission.schoolAddress, [ ]],
  previewDate : [this.selectedDecisionOfTheDirectorOfTheCommission.previewDate, [ ]],
  startDate : [this.selectedDecisionOfTheDirectorOfTheCommission.startDate, [ ]],
  endDate : [this.selectedDecisionOfTheDirectorOfTheCommission.endDate, [ ]],
  text : [this.selectedDecisionOfTheDirectorOfTheCommission.text, [ Validators.required ]],
  sectionCenter : [this.selectedDecisionOfTheDirectorOfTheCommission.sectionCenter, [ Validators.required ]],
  village : [this.selectedDecisionOfTheDirectorOfTheCommission.village, [ Validators.required ]],
  educationalAdministration : [this.selectedDecisionOfTheDirectorOfTheCommission.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.decisionOfTheDirectorOfTheCommissionService.create(this.decisionOfTheDirectorOfTheCommissionForm.value)
        .pipe(switchMap(x => {
			return this.decisionOfTheDirectorOfTheCommissionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.decisionOfTheDirectorOfTheCommissionForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
