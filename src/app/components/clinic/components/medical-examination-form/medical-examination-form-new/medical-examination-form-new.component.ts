
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MedicalExaminationForm } from 'app/shared/models/medical-examination-form';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { MedicalExaminationFormService } from '../shared/medical-examination-form.service';


@Component({
  selector: 'app-medical-examination-form-new',
  templateUrl: './medical-examination-form-new.component.html',
  styleUrls: ['./medical-examination-form-new.component.scss'],
  providers: [
    ]
})

export class MedicalExaminationFormNewComponent extends AppBaseComponent implements OnInit {
  medicalExaminationFormForm: FormGroup;
  @Input() selectedMedicalExaminationForm: MedicalExaminationForm;
  errorMessages: FormControlError[] = [
        
  ];

  private diseasesTypesService: LookupService;
private detectionTypesService: LookupService;

  
diseaseCodeSelectOptions: MaterialSelectOptions;
examinationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('diseaseCode', { static: true }) DiseaseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('examinationType', { static: true }) ExaminationTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MedicalExaminationFormNewComponent>,
    public medicalExaminationFormService: MedicalExaminationFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMedicalExaminationForm = new MedicalExaminationForm();

    
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
     
  id : [0],
  diagnosis : [this.selectedMedicalExaminationForm.diagnosis, [ Validators.required ]],
  examinationDate : [this.selectedMedicalExaminationForm.examinationDate, [ Validators.required ]],
  patientName : [this.selectedMedicalExaminationForm.patientName, [ ]],
  patientCode : [this.selectedMedicalExaminationForm.patientCode, [ Validators.required ]],
  doctorName : [this.selectedMedicalExaminationForm.doctorName, [ Validators.required ]],
  doctorCode : [this.selectedMedicalExaminationForm.doctorCode, [ Validators.required ]],
  diseaseCode : [this.selectedMedicalExaminationForm.diseaseCode, [ Validators.required ]],
  examinationType : [this.selectedMedicalExaminationForm.examinationType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.medicalExaminationFormService.create(this.medicalExaminationFormForm.value)
        .pipe(switchMap(x => {
			return this.medicalExaminationFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.medicalExaminationFormForm.get(name);
    }

  initializeLookupServices() {
    this.diseasesTypesService = new LookupService('diseasestypes', this.http);
this.detectionTypesService = new LookupService('detectiontypes', this.http);
  }
 }
