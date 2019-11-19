
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MedicalExaminationForm } from 'app/shared/models/medical-examination-form';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { MedicalExaminationFormService } from '../shared/medical-examination-form.service';




@Component({
  selector: 'app-medical-examination-form-edit',
  templateUrl: './medical-examination-form-edit.component.html',
  styleUrls: ['./medical-examination-form-edit.component.scss'],
  providers: []
})

export class MedicalExaminationFormEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMedicalExaminationForm: MedicalExaminationForm;
  medicalExaminationFormForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private diseasesTypesService: LookupService;
private detectionTypesService: LookupService;

  
diseaseCodeSelectOptions: MaterialSelectOptions;
examinationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('diseaseCode', { static: true }) DiseaseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('examinationType', { static: true }) ExaminationTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMedicalExaminationFormDialog: any,
    @Optional() public dialogRef: MatDialogRef<MedicalExaminationFormEditComponent>,
    public medicalExaminationFormService: MedicalExaminationFormService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMedicalExaminationForm = new MedicalExaminationForm();
    this.selectedMedicalExaminationForm = this.selectedMedicalExaminationFormDialog.data || this.selectedMedicalExaminationForm;

    
	this.diseaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.diseasesTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المرض',
	});

	this.examinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.detectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الكشف',
	});


    this.medicalExaminationFormForm = this.formBuilder.group({
      
  id : [this.selectedMedicalExaminationForm.id],
  diagnosis : [this.selectedMedicalExaminationForm.diagnosis, [ Validators.required ]],
  examinationDate : [this.selectedMedicalExaminationForm.examinationDate, [ Validators.required ]],
  patientName : [this.selectedMedicalExaminationForm.patientName, [ ]],
  patientCode : [this.selectedMedicalExaminationForm.patientCode, [ Validators.required ]],
  doctorCode : [this.selectedMedicalExaminationForm.doctorCode, [ Validators.required ]],
  doctorName : [this.selectedMedicalExaminationForm.doctorName, [ ]],
  diseaseCode : [this.selectedMedicalExaminationForm.diseaseCode, [ Validators.required ]],
  examinationType : [this.selectedMedicalExaminationForm.examinationType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.medicalExaminationFormService.update(this.medicalExaminationFormForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.medicalExaminationFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.medicalExaminationFormForm.get(name);
  }

  initializeLookupServices() {
    this.diseasesTypesService = new LookupService('diseasestypes', this.http);
this.detectionTypesService = new LookupService('detectiontypes', this.http);
  }
}
