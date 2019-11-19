
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeEducationalQualifications } from 'app/shared/models/employee-educational-qualifications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeEducationalQualificationsService } from '../shared/employee-educational-qualifications.service';


@Component({
  selector: 'app-employee-educational-qualifications-new',
  templateUrl: './employee-educational-qualifications-new.component.html',
  styleUrls: ['./employee-educational-qualifications-new.component.scss'],
  providers: [
    ]
})

export class EmployeeEducationalQualificationsNewComponent extends AppBaseComponent implements OnInit {
  employeeEducationalQualificationsForm: FormGroup;
  @Input() selectedEmployeeEducationalQualifications: EmployeeEducationalQualifications;
  errorMessages: FormControlError[] = [
        
  ];

  private qualificationsService: LookupService;
private qualificationGrantSitesService: LookupService;

  
qualificationSelectOptions: MaterialSelectOptions;
qualificationGrantSiteSelectOptions: MaterialSelectOptions;

  
	@ViewChild('qualification', { static: true }) QualificationSelectComponent: MaterialSelectComponent;
	@ViewChild('qualificationGrantSite', { static: true }) QualificationGrantSiteSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeEducationalQualificationsNewComponent>,
    public employeeEducationalQualificationsService: EmployeeEducationalQualificationsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeEducationalQualifications = new EmployeeEducationalQualifications();

    
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
     
  id : [0],
  employeeCode : [this.selectedEmployeeEducationalQualifications.employeeCode, [ Validators.required ]],
  qualificationDate : [this.selectedEmployeeEducationalQualifications.qualificationDate, [ ]],
  qualification : [this.selectedEmployeeEducationalQualifications.qualification, [ Validators.required ]],
  qualificationGrantSite : [this.selectedEmployeeEducationalQualifications.qualificationGrantSite, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeEducationalQualificationsService.create(this.employeeEducationalQualificationsForm.value)
        .pipe(switchMap(x => {
			return this.employeeEducationalQualificationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeEducationalQualificationsForm.get(name);
    }

  initializeLookupServices() {
    this.qualificationsService = new LookupService('qualifications', this.http);
this.qualificationGrantSitesService = new LookupService('qualificationgrantsites', this.http);
  }
 }
