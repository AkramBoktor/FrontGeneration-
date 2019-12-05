
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BuildingValidityCertificate } from 'app/shared/models/building-validity-certificate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingValidityCertificateService } from '../shared/building-validity-certificate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-validity-certificate-new',
  templateUrl: './building-validity-certificate-new.component.html',
  styleUrls: ['./building-validity-certificate-new.component.scss'],
  providers: [
    ]
})

export class BuildingValidityCertificateNewComponent extends AppBaseComponent implements OnInit {
  buildingValidityCertificateForm: FormGroup;
  @Input() selectedBuildingValidityCertificate: BuildingValidityCertificate;
  errorMessages: FormControlError[] = [
        
  ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private validityPositionsService: LookupService;
private educationValiditiesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
validityPositionSelectOptions: MaterialSelectOptions;
educationValiditySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('validityPosition', { static: true }) ValidityPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationValidity', { static: true }) EducationValiditySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BuildingValidityCertificateNewComponent>,
    public buildingValidityCertificateService: BuildingValidityCertificateService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingValidityCertificate = new BuildingValidityCertificate();

    
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

	this.validityPositionSelectOptions = new MaterialSelectOptions({
	 data: this.validityPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الصلاحية',
	});

	this.educationValiditySelectOptions = new MaterialSelectOptions({
	 data: this.educationValiditiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صلاحية المدرسة للعملية التعليميه',
	});


    this.buildingValidityCertificateForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedBuildingValidityCertificate.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedBuildingValidityCertificate.schoolAddress, [ ]],
  previewDate : [this.selectedBuildingValidityCertificate.previewDate, [ ]],
  startDate : [this.selectedBuildingValidityCertificate.startDate, [ ]],
  endDate : [this.selectedBuildingValidityCertificate.endDate, [ ]],
  statementType : [this.selectedBuildingValidityCertificate.statementType, [ Validators.required ]],
  text : [this.selectedBuildingValidityCertificate.text, [ Validators.required ]],
  sectionCenter : [this.selectedBuildingValidityCertificate.sectionCenter, [ Validators.required ]],
  village : [this.selectedBuildingValidityCertificate.village, [ Validators.required ]],
  educationalAdministration : [this.selectedBuildingValidityCertificate.educationalAdministration, [ Validators.required ]],
  validityPosition : [this.selectedBuildingValidityCertificate.validityPosition, [ Validators.required ]],
  educationValidity : [this.selectedBuildingValidityCertificate.educationValidity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.buildingValidityCertificateService.create(this.buildingValidityCertificateForm.value)
        .pipe(switchMap(x => {
			return this.buildingValidityCertificateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.buildingValidityCertificateForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.validityPositionsService = new LookupService('validitypositions', this.http);
this.educationValiditiesService = new LookupService('educationvalidities', this.http);
  }
 }
