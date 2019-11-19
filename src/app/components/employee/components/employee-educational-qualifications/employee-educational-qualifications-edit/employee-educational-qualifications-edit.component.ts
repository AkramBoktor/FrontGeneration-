
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeEducationalQualifications } from 'app/shared/models/employee-educational-qualifications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeEducationalQualificationsService } from '../shared/employee-educational-qualifications.service';




@Component({
  selector: 'app-employee-educational-qualifications-edit',
  templateUrl: './employee-educational-qualifications-edit.component.html',
  styleUrls: ['./employee-educational-qualifications-edit.component.scss'],
  providers: []
})

export class EmployeeEducationalQualificationsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeEducationalQualifications: EmployeeEducationalQualifications;
  employeeEducationalQualificationsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private qualificationsService: LookupService;
private qualificationGrantSitesService: LookupService;

  
qualificationSelectOptions: MaterialSelectOptions;
qualificationGrantSiteSelectOptions: MaterialSelectOptions;

  
	@ViewChild('qualification', { static: true }) QualificationSelectComponent: MaterialSelectComponent;
	@ViewChild('qualificationGrantSite', { static: true }) QualificationGrantSiteSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeEducationalQualificationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeEducationalQualificationsEditComponent>,
    public employeeEducationalQualificationsService: EmployeeEducationalQualificationsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeEducationalQualifications = new EmployeeEducationalQualifications();
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
      
  id : [this.selectedEmployeeEducationalQualifications.id],
  employeeCode : [this.selectedEmployeeEducationalQualifications.employeeCode, [ Validators.required ]],
  qualificationDate : [this.selectedEmployeeEducationalQualifications.qualificationDate, [ Validators.required ]],
  qualification : [this.selectedEmployeeEducationalQualifications.qualification, [ Validators.required ]],
  qualificationGrantSite : [this.selectedEmployeeEducationalQualifications.qualificationGrantSite, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeEducationalQualificationsService.update(this.employeeEducationalQualificationsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeEducationalQualificationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeEducationalQualificationsForm.get(name);
  }

  initializeLookupServices() {
    this.qualificationsService = new LookupService('qualifications', this.http);
this.qualificationGrantSitesService = new LookupService('qualificationgrantsites', this.http);
  }
}
