
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { HostedSchool } from 'app/shared/models/hosted-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { HostedSchoolService } from '../shared/hosted-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hosted-school-new',
  templateUrl: './hosted-school-new.component.html',
  styleUrls: ['./hosted-school-new.component.scss'],
  providers: [
    ]
})

export class HostedSchoolNewComponent extends AppBaseComponent implements OnInit {
  hostedSchoolForm: FormGroup;
  @Input() selectedHostedSchool: HostedSchool;
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
    @Optional() public dialogRef: MatDialogRef<HostedSchoolNewComponent>,
    public hostedSchoolService: HostedSchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHostedSchool = new HostedSchool();

    
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
     
  id : [0],
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
    this.hostedSchoolService.create(this.hostedSchoolForm.value)
        .pipe(switchMap(x => {
			return this.hostedSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
