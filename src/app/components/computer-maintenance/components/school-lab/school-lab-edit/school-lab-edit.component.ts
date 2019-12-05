
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolLab } from 'app/shared/models/school-lab';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolLabService } from '../shared/school-lab.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-lab-edit',
  templateUrl: './school-lab-edit.component.html',
  styleUrls: ['./school-lab-edit.component.scss'],
  providers: []
})

export class SchoolLabEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolLab: SchoolLab;
  schoolLabForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolLabDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolLabEditComponent>,
    public schoolLabService: SchoolLabService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolLab = new SchoolLab();
    this.selectedSchoolLab = this.selectedSchoolLabDialog.data || this.selectedSchoolLab;

    
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
      
  id : [this.selectedSchoolLab.id],
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
    this.schoolLabService.update(this.schoolLabForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolLabService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolLabForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
}
