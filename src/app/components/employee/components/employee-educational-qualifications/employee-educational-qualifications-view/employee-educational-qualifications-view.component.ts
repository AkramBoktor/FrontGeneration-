
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeEducationalQualifications } from 'app/shared/models/employee-educational-qualifications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeEducationalQualificationsService } from '../shared/employee-educational-qualifications.service';

@Component({
  selector: 'app-employee-educational-qualifications-view',
  templateUrl: './employee-educational-qualifications-view.component.html',
  styleUrls: ['./employee-educational-qualifications-view.component.scss'],
  providers: []
})

export class EmployeeEducationalQualificationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeEducationalQualifications: EmployeeEducationalQualifications;
  employeeEducationalQualificationsForm: FormGroup;

  private qualificationsService: LookupService;
private qualificationGrantSitesService: LookupService;

  
qualificationSelectOptions: MaterialSelectOptions;
qualificationGrantSiteSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeEducationalQualificationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeEducationalQualificationsViewComponent>,
    public employeeEducationalQualificationsService: EmployeeEducationalQualificationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeEducationalQualifications = this.selectedEmployeeEducationalQualificationsDialog.data || this.selectedEmployeeEducationalQualifications;

    
	this.qualificationSelectOptions = new MaterialSelectOptions({
	 data: this.qualificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المؤهل',
	});

	this.qualificationGrantSiteSelectOptions = new MaterialSelectOptions({
	 data: this.qualificationGrantSitesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة منح المؤهل',
	});


    this.employeeEducationalQualificationsForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeEducationalQualifications.employeeCode],
  qualificationDate : [this.selectedEmployeeEducationalQualifications.qualificationDate],
  qualification : [this.selectedEmployeeEducationalQualifications.qualification],
  qualificationGrantSite : [this.selectedEmployeeEducationalQualifications.qualificationGrantSite]
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
    return this.employeeEducationalQualificationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeEducationalQualificationsForm.controls)) {
      this.employeeEducationalQualificationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.qualificationsService = new LookupService('qualifications', this.http);
this.qualificationGrantSitesService = new LookupService('qualificationgrantsites', this.http);
  }
}

