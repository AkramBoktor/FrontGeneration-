
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { HostedSchool } from 'app/shared/models/hosted-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { HostedSchoolService } from '../shared/hosted-school.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hosted-school-edit',
  templateUrl: './hosted-school-edit.component.html',
  styleUrls: ['./hosted-school-edit.component.scss'],
  providers: []
})

export class HostedSchoolEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHostedSchool: HostedSchool;
  hostedSchoolForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private hostingReasonsService: LookupService;
private educationalLevelsService: LookupService;
private pupilsTypesService: LookupService;

  
hostingReasonsSelectOptions: MaterialSelectOptions;
hostedSchoolStageSelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hostingReasons', { static: true }) HostingReasonsSelectComponent: MaterialSelectComponent;
	@ViewChild('hostedSchoolStage', { static: true }) HostedSchoolStageSelectComponent: MaterialSelectComponent;
	@ViewChild('pupilsType', { static: true }) PupilsTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHostedSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<HostedSchoolEditComponent>,
    public hostedSchoolService: HostedSchoolService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHostedSchool = new HostedSchool();
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
      
  id : [this.selectedHostedSchool.id],
  hostSchoolNumber : [this.selectedHostedSchool.hostSchoolNumber, [ Validators.required ]],
  hostingDurationFrom : [this.selectedHostedSchool.hostingDurationFrom, [ Validators.required ]],
  durationTo : [this.selectedHostedSchool.durationTo, [ Validators.required ]],
  hostedSchoolNumber : [this.selectedHostedSchool.hostedSchoolNumber, [ Validators.required ]],
  pupilsNumber : [this.selectedHostedSchool.pupilsNumber, [ Validators.required ]],
  spacesUsedNumber : [this.selectedHostedSchool.spacesUsedNumber, [ Validators.required ]],
  hostingReasons : [this.selectedHostedSchool.hostingReasons, [ Validators.required ]],
  hostedSchoolStage : [this.selectedHostedSchool.hostedSchoolStage, [ Validators.required ]],
  pupilsType : [this.selectedHostedSchool.pupilsType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.hostedSchoolService.update(this.hostedSchoolForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.hostedSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.hostedSchoolForm.get(name);
  }

  initializeLookupServices() {
    this.hostingReasonsService = new LookupService('hostingreasons', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}
