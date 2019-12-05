
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InspectionForm } from 'app/shared/models/inspection-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InspectionFormService } from '../shared/inspection-form.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-inspection-form-edit',
  templateUrl: './inspection-form-edit.component.html',
  styleUrls: ['./inspection-form-edit.component.scss'],
  providers: []
})

export class InspectionFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInspectionForm: InspectionForm;
  inspectionFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private subDepartmentsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInspectionFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<InspectionFormEditComponent>,
    public inspectionFormService: InspectionFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInspectionForm = new InspectionForm();
    this.selectedInspectionForm = this.selectedInspectionFormDialog.data || this.selectedInspectionForm;

    
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
      
  id : [this.selectedInspectionForm.id],
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
    this.inspectionFormService.update(this.inspectionFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.inspectionFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.inspectionFormForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
