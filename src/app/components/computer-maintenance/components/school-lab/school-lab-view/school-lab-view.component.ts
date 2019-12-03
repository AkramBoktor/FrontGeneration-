
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolLab } from 'app/shared/models/school-lab';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolLabService } from '../shared/school-lab.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-lab-view',
  templateUrl: './school-lab-view.component.html',
  styleUrls: ['./school-lab-view.component.scss'],
  providers: []
})

export class SchoolLabViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolLab: SchoolLab;
  schoolLabForm: FormGroup;

  private buildingTypesService: LookupService;
private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolLabDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolLabViewComponent>,
    public schoolLabService: SchoolLabService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedSchoolLab.buildingCode],
  laboratoryNumber : [this.selectedSchoolLab.laboratoryNumber],
  buildingType : [this.selectedSchoolLab.buildingType],
  areaCode : [this.selectedSchoolLab.areaCode],
  laboratoryType : [this.selectedSchoolLab.laboratoryType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.schoolLabForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolLabForm.controls)) {
      this.schoolLabForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
}

