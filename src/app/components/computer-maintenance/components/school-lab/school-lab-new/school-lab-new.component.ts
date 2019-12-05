
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolLab } from 'app/shared/models/school-lab';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolLabService } from '../shared/school-lab.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-lab-new',
  templateUrl: './school-lab-new.component.html',
  styleUrls: ['./school-lab-new.component.scss'],
  providers: [
    ]
})

export class SchoolLabNewComponent extends AppBaseComponent implements OnInit {
  schoolLabForm: FormGroup;
  @Input() selectedSchoolLab: SchoolLab;
  errorMessages: FormControlError[] = [
        
  ];

  private buildingTypesService: LookupService;
private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolLabNewComponent>,
    public schoolLabService: SchoolLabService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolLab = new SchoolLab();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});


    this.schoolLabForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedSchoolLab.buildingCode, [ Validators.required ]],
  laboratoryNumber : [this.selectedSchoolLab.laboratoryNumber, [ Validators.required ]],
  buildingType : [this.selectedSchoolLab.buildingType, [ Validators.required ]],
  areaCode : [this.selectedSchoolLab.areaCode, [ Validators.required ]],
  laboratoryType : [this.selectedSchoolLab.laboratoryType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolLabService.create(this.schoolLabForm.value)
        .pipe(switchMap(x => {
			return this.schoolLabService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolLabForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
 }
