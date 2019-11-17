
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AdditionalMission } from 'app/shared/models/additional-mission';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AdditionalMissionService } from '../shared/additional-mission.service';

@Component({
  selector: 'app-additional-mission-view',
  templateUrl: './additional-mission-view.component.html',
  styleUrls: ['./additional-mission-view.component.scss'],
  providers: []
})

export class AdditionalMissionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdditionalMission: AdditionalMission;
  additionalMissionForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdditionalMissionDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdditionalMissionViewComponent>,
    public additionalMissionService: AdditionalMissionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdditionalMission = this.selectedAdditionalMissionDialog.data || this.selectedAdditionalMission;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});


    this.additionalMissionForm = this.formBuilder.group({
      
  employeeCode : [this.selectedAdditionalMission.employeeCode],
  totalExtraWork : [this.selectedAdditionalMission.totalExtraWork],
  eveningTotalWorkingHour : [this.selectedAdditionalMission.eveningTotalWorkingHour],
  centralAdministration : [this.selectedAdditionalMission.centralAdministration],
  subAdministration : [this.selectedAdditionalMission.subAdministration]
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
    return this.additionalMissionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.additionalMissionForm.controls)) {
      this.additionalMissionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

