
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PreparingStudentsInClassrooms } from 'app/shared/models/preparing-students-in-classrooms';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PreparingStudentsInClassroomsService } from '../shared/preparing-students-in-classrooms.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-preparing-students-in-classrooms-edit',
  templateUrl: './preparing-students-in-classrooms-edit.component.html',
  styleUrls: ['./preparing-students-in-classrooms-edit.component.scss'],
  providers: []
})

export class PreparingStudentsInClassroomsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPreparingStudentsInClassrooms: PreparingStudentsInClassrooms;
  preparingStudentsInClassroomsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private educationalLevelsService: LookupService;
private classroomsService: LookupService;
private pupilsTypesService: LookupService;

  
stageSelectOptions: MaterialSelectOptions;
classroomSelectOptions: MaterialSelectOptions;
studentsKindSelectOptions: MaterialSelectOptions;

  
	@ViewChild('stage', { static: true }) StageSelectComponent: MaterialSelectComponent;
	@ViewChild('classroom', { static: true }) ClassroomSelectComponent: MaterialSelectComponent;
	@ViewChild('studentsKind', { static: true }) StudentsKindSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPreparingStudentsInClassroomsDialog: any,
    @Optional() public dialogRef: MatDialogRef<PreparingStudentsInClassroomsEditComponent>,
    public preparingStudentsInClassroomsService: PreparingStudentsInClassroomsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPreparingStudentsInClassrooms = new PreparingStudentsInClassrooms();
    this.selectedPreparingStudentsInClassrooms = this.selectedPreparingStudentsInClassroomsDialog.data || this.selectedPreparingStudentsInClassrooms;

    
	this.stageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحله',
	});

	this.classroomSelectOptions = new MaterialSelectOptions({
	 data: this.classroomsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الصف الدراسي',
	});

	this.studentsKindSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوعيه الطلبه',
	});


    this.preparingStudentsInClassroomsForm = this.formBuilder.group({
      
  id : [this.selectedPreparingStudentsInClassrooms.id],
  buildingCode : [this.selectedPreparingStudentsInClassrooms.buildingCode, [ Validators.required ]],
  periodNumber : [this.selectedPreparingStudentsInClassrooms.periodNumber, [ ]],
  teamsNumber : [this.selectedPreparingStudentsInClassrooms.teamsNumber, [ Validators.required ]],
  girlsNumber : [this.selectedPreparingStudentsInClassrooms.girlsNumber, [ Validators.required ]],
  boysNumber : [this.selectedPreparingStudentsInClassrooms.boysNumber, [ Validators.required ]],
  total : [this.selectedPreparingStudentsInClassrooms.total, [ Validators.required ]],
  totalRecorded : [this.selectedPreparingStudentsInClassrooms.totalRecorded, [ Validators.required ]],
  stage : [this.selectedPreparingStudentsInClassrooms.stage, [ Validators.required ]],
  classroom : [this.selectedPreparingStudentsInClassrooms.classroom, [ Validators.required ]],
  studentsKind : [this.selectedPreparingStudentsInClassrooms.studentsKind, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.preparingStudentsInClassroomsService.update(this.preparingStudentsInClassroomsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.preparingStudentsInClassroomsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.preparingStudentsInClassroomsForm.get(name);
  }

  initializeLookupServices() {
    this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.classroomsService = new LookupService('classrooms', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}
