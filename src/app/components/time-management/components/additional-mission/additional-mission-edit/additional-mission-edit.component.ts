
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AdditionalMission } from 'app/shared/models/additional-mission';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AdditionalMissionService } from '../shared/additional-mission.service';




@Component({
  selector: 'app-additional-mission-edit',
  templateUrl: './additional-mission-edit.component.html',
  styleUrls: ['./additional-mission-edit.component.scss'],
  providers: []
})

export class AdditionalMissionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdditionalMission: AdditionalMission;
  additionalMissionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdditionalMissionDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdditionalMissionEditComponent>,
    public additionalMissionService: AdditionalMissionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdditionalMission = new AdditionalMission();
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
      
  id : [this.selectedAdditionalMission.id],
  employeeCode : [this.selectedAdditionalMission.employeeCode, [ Validators.required ]],
  totalExtraWork : [this.selectedAdditionalMission.totalExtraWork, [ Validators.required ]],
  eveningTotalWorkingHour : [this.selectedAdditionalMission.eveningTotalWorkingHour, [ Validators.required ]],
  centralAdministration : [this.selectedAdditionalMission.centralAdministration, [ Validators.required ]],
  subAdministration : [this.selectedAdditionalMission.subAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.additionalMissionService.update(this.additionalMissionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.additionalMissionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.additionalMissionForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
