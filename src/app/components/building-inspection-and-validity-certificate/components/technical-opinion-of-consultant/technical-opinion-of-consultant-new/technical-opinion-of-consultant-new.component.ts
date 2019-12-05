
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TechnicalOpinionOfConsultant } from 'app/shared/models/technical-opinion-of-consultant';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TechnicalOpinionOfConsultantService } from '../shared/technical-opinion-of-consultant.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-technical-opinion-of-consultant-new',
  templateUrl: './technical-opinion-of-consultant-new.component.html',
  styleUrls: ['./technical-opinion-of-consultant-new.component.scss'],
  providers: [
    ]
})

export class TechnicalOpinionOfConsultantNewComponent extends AppBaseComponent implements OnInit {
  technicalOpinionOfConsultantForm: FormGroup;
  @Input() selectedTechnicalOpinionOfConsultant: TechnicalOpinionOfConsultant;
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
    @Optional() public dialogRef: MatDialogRef<TechnicalOpinionOfConsultantNewComponent>,
    public technicalOpinionOfConsultantService: TechnicalOpinionOfConsultantService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTechnicalOpinionOfConsultant = new TechnicalOpinionOfConsultant();

    
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


    this.technicalOpinionOfConsultantForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedTechnicalOpinionOfConsultant.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedTechnicalOpinionOfConsultant.schoolAddress, [ ]],
  previewDate : [this.selectedTechnicalOpinionOfConsultant.previewDate, [ ]],
  startDate : [this.selectedTechnicalOpinionOfConsultant.startDate, [ ]],
  endDate : [this.selectedTechnicalOpinionOfConsultant.endDate, [ ]],
  statementType : [this.selectedTechnicalOpinionOfConsultant.statementType, [ Validators.required ]],
  text : [this.selectedTechnicalOpinionOfConsultant.text, [ Validators.required ]],
  sectionCenter : [this.selectedTechnicalOpinionOfConsultant.sectionCenter, [ Validators.required ]],
  village : [this.selectedTechnicalOpinionOfConsultant.village, [ Validators.required ]],
  educationalAdministration : [this.selectedTechnicalOpinionOfConsultant.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.technicalOpinionOfConsultantService.create(this.technicalOpinionOfConsultantForm.value)
        .pipe(switchMap(x => {
			return this.technicalOpinionOfConsultantService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.technicalOpinionOfConsultantForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
