
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AdditionalMission } from 'app/shared/models/additional-mission';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AdditionalMissionService } from '../shared/additional-mission.service';


@Component({
  selector: 'app-additional-mission-new',
  templateUrl: './additional-mission-new.component.html',
  styleUrls: ['./additional-mission-new.component.scss'],
  providers: [
    ]
})

export class AdditionalMissionNewComponent extends AppBaseComponent implements OnInit {
  additionalMissionForm: FormGroup;
  @Input() selectedAdditionalMission: AdditionalMission;
  errorMessages: FormControlError[] = [
        
  ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AdditionalMissionNewComponent>,
    public additionalMissionService: AdditionalMissionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdditionalMission = new AdditionalMission();

    
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
     
  id : [0],
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
    this.additionalMissionService.create(this.additionalMissionForm.value)
        .pipe(switchMap(x => {
			return this.additionalMissionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.additionalMissionForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
