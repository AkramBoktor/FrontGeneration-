
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TechnicalOpinionOfConsultant } from 'app/shared/models/technical-opinion-of-consultant';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TechnicalOpinionOfConsultantService } from '../shared/technical-opinion-of-consultant.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-technical-opinion-of-consultant-edit',
  templateUrl: './technical-opinion-of-consultant-edit.component.html',
  styleUrls: ['./technical-opinion-of-consultant-edit.component.scss'],
  providers: []
})

export class TechnicalOpinionOfConsultantEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTechnicalOpinionOfConsultant: TechnicalOpinionOfConsultant;
  technicalOpinionOfConsultantForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTechnicalOpinionOfConsultantDialog: any,
    @Optional() public dialogRef: MatDialogRef<TechnicalOpinionOfConsultantEditComponent>,
    public technicalOpinionOfConsultantService: TechnicalOpinionOfConsultantService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTechnicalOpinionOfConsultant = new TechnicalOpinionOfConsultant();
    this.selectedTechnicalOpinionOfConsultant = this.selectedTechnicalOpinionOfConsultantDialog.data || this.selectedTechnicalOpinionOfConsultant;

    
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
      
  id : [this.selectedTechnicalOpinionOfConsultant.id],
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
    this.technicalOpinionOfConsultantService.update(this.technicalOpinionOfConsultantForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.technicalOpinionOfConsultantService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.technicalOpinionOfConsultantForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
