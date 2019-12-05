
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InspectionForm } from 'app/shared/models/inspection-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InspectionFormService } from '../shared/inspection-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-inspection-form-view',
  templateUrl: './inspection-form-view.component.html',
  styleUrls: ['./inspection-form-view.component.scss'],
  providers: []
})

export class InspectionFormViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInspectionForm: InspectionForm;
  inspectionFormForm: FormGroup;

  private branchCodesService: LookupService;
private subDepartmentsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInspectionFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<InspectionFormViewComponent>,
    public inspectionFormService: InspectionFormService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  schoolNumber : [this.selectedInspectionForm.schoolNumber],
  inspectionDate : [this.selectedInspectionForm.inspectionDate],
  schoolManger : [this.selectedInspectionForm.schoolManger],
  managementEducationInspectionMember : [this.selectedInspectionForm.managementEducationInspectionMember],
  directorEducationalAdministrationAccreditation : [this.selectedInspectionForm.directorEducationalAdministrationAccreditation],
  arealAdministrationAccreditation : [this.selectedInspectionForm.arealAdministrationAccreditation],
  branchCode : [this.selectedInspectionForm.branchCode],
  administrationCode : [this.selectedInspectionForm.administrationCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.inspectionFormForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.inspectionFormForm.controls)) {
      this.inspectionFormForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

