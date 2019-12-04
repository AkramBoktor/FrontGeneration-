
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { HostedSchool } from 'app/shared/models/hosted-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { HostedSchoolService } from '../shared/hosted-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-hosted-school-view',
  templateUrl: './hosted-school-view.component.html',
  styleUrls: ['./hosted-school-view.component.scss'],
  providers: []
})

export class HostedSchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHostedSchool: HostedSchool;
  hostedSchoolForm: FormGroup;

  private hostingReasonsService: LookupService;
private educationalLevelsService: LookupService;
private pupilsTypesService: LookupService;

  
hostingReasonsSelectOptions: MaterialSelectOptions;
hostedSchoolStageSelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHostedSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<HostedSchoolViewComponent>,
    public hostedSchoolService: HostedSchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHostedSchool = this.selectedHostedSchoolDialog.data || this.selectedHostedSchool;

    
	this.hostingReasonsSelectOptions = new MaterialSelectOptions({
	 data: this.hostingReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'أسباب الاستضافة',
	});

	this.hostedSchoolStageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مرحلة المدرسه المستضافه',
	});

	this.pupilsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع تلاميذ المستضيفه',
	});


    this.hostedSchoolForm = this.formBuilder.group({
      
  hostSchoolNumber : [this.selectedHostedSchool.hostSchoolNumber],
  hostingDurationFrom : [this.selectedHostedSchool.hostingDurationFrom],
  durationTo : [this.selectedHostedSchool.durationTo],
  hostedSchoolNumber : [this.selectedHostedSchool.hostedSchoolNumber],
  pupilsNumber : [this.selectedHostedSchool.pupilsNumber],
  spacesUsedNumber : [this.selectedHostedSchool.spacesUsedNumber],
  hostingReasons : [this.selectedHostedSchool.hostingReasons],
  hostedSchoolStage : [this.selectedHostedSchool.hostedSchoolStage],
  pupilsType : [this.selectedHostedSchool.pupilsType]
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
    return this.hostedSchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.hostedSchoolForm.controls)) {
      this.hostedSchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.hostingReasonsService = new LookupService('hostingreasons', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}

