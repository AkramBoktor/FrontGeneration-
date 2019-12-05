
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InspectionForm } from 'app/shared/models/inspection-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InspectionFormService } from '../shared/inspection-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-inspection-form-new',
  templateUrl: './inspection-form-new.component.html',
  styleUrls: ['./inspection-form-new.component.scss'],
  providers: [
    ]
})

export class InspectionFormNewComponent extends AppBaseComponent implements OnInit {
  inspectionFormForm: FormGroup;
  @Input() selectedInspectionForm: InspectionForm;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private subDepartmentsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InspectionFormNewComponent>,
    public inspectionFormService: InspectionFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInspectionForm = new InspectionForm();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الفرع  ',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.inspectionFormForm = this.formBuilder.group({
     
  id : [0],
  schoolNumber : [this.selectedInspectionForm.schoolNumber, [ Validators.required ]],
  inspectionDate : [this.selectedInspectionForm.inspectionDate, [ Validators.required ]],
  schoolManger : [this.selectedInspectionForm.schoolManger, [ Validators.required ]],
  managementEducationInspectionMember : [this.selectedInspectionForm.managementEducationInspectionMember, [ Validators.required ]],
  directorEducationalAdministrationAccreditation : [this.selectedInspectionForm.directorEducationalAdministrationAccreditation, [ Validators.required ]],
  arealAdministrationAccreditation : [this.selectedInspectionForm.arealAdministrationAccreditation, [ Validators.required ]],
  branchCode : [this.selectedInspectionForm.branchCode, [ Validators.required ]],
  administrationCode : [this.selectedInspectionForm.administrationCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.inspectionFormService.create(this.inspectionFormForm.value)
        .pipe(switchMap(x => {
			return this.inspectionFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.inspectionFormForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
