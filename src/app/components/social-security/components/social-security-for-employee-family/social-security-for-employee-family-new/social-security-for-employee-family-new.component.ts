
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SocialSecurityForEmployeeFamily } from 'app/shared/models/social-security-for-employee-family';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SocialSecurityForEmployeeFamilyService } from '../shared/social-security-for-employee-family.service';


@Component({
  selector: 'app-social-security-for-employee-family-new',
  templateUrl: './social-security-for-employee-family-new.component.html',
  styleUrls: ['./social-security-for-employee-family-new.component.scss'],
  providers: [
    ]
})

export class SocialSecurityForEmployeeFamilyNewComponent extends AppBaseComponent implements OnInit {
  socialSecurityForEmployeeFamilyForm: FormGroup;
  @Input() selectedSocialSecurityForEmployeeFamily: SocialSecurityForEmployeeFamily;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  private relationshipTypesService: LookupService;

  
relationshipSelectOptions: MaterialSelectOptions;

  
	@ViewChild('relationship', { static: true }) RelationshipSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SocialSecurityForEmployeeFamilyNewComponent>,
    public socialSecurityForEmployeeFamilyService: SocialSecurityForEmployeeFamilyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialSecurityForEmployeeFamily = new SocialSecurityForEmployeeFamily();

    
	this.relationshipSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الصفة',
	});


    this.socialSecurityForEmployeeFamilyForm = this.formBuilder.group({
     
  id : [0],
  individualSerial : [this.selectedSocialSecurityForEmployeeFamily.individualSerial, [ Validators.required,Validators.min(1) ]],
  employeeName : [this.selectedSocialSecurityForEmployeeFamily.employeeName, [ ]],
  employeeCode : [this.selectedSocialSecurityForEmployeeFamily.employeeCode, [ ]],
  insuranceNumber : [this.selectedSocialSecurityForEmployeeFamily.insuranceNumber, [ ]],
  relationship : [this.selectedSocialSecurityForEmployeeFamily.relationship, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.socialSecurityForEmployeeFamilyService.create(this.socialSecurityForEmployeeFamilyForm.value)
        .pipe(switchMap(x => {
			return this.socialSecurityForEmployeeFamilyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.socialSecurityForEmployeeFamilyForm.get(name);
    }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
 }
