
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsCurrentlyExtractingInsurance} from 'app/shared/models/schools-currently-extracting-insurance';
import { switchMap } from 'rxjs/operators';
import { SchoolsCurrentlyExtractingInsuranceService } from '../shared/schools-currently-extracting-insurance.service';


@Component({
  selector: 'app-schools-currently-extracting-insurance-new',
  templateUrl: './schools-currently-extracting-insurance-new.component.html',
  styleUrls: ['./schools-currently-extracting-insurance-new.component.scss'],
  providers: [
    ]
})

export class SchoolsCurrentlyExtractingInsuranceNewComponent extends AppBaseComponent implements OnInit {
  schoolsCurrentlyExtractingInsuranceForm: FormGroup;
  @Input() selectedSchoolsCurrentlyExtractingInsurance: SchoolsCurrentlyExtractingInsurance;
  errorMessages: FormControlError[] = [
        
  ];


  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolsCurrentlyExtractingInsuranceNewComponent>,
    public schoolsCurrentlyExtractingInsuranceService: SchoolsCurrentlyExtractingInsuranceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsCurrentlyExtractingInsurance = new SchoolsCurrentlyExtractingInsurance();

    

    this.schoolsCurrentlyExtractingInsuranceForm = this.formBuilder.group({
     
  id : [0],
  insuranceCompanyCode : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyCode, [ Validators.required ]],
  insuranceCompanyName : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyName, [ ]],
  schoolCode : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolCode, [ Validators.required ]],
  schoolName : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolName, [ ]],
  extensionNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.extensionNumber, [ Validators.required ]],
  modelCode : [this.selectedSchoolsCurrentlyExtractingInsurance.modelCode, [ Validators.required ]],
  floorsNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.classroomNumber, [ Validators.required ]],
  schoolNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolNumber, [ Validators.required ]],
  deliveryDate : [this.selectedSchoolsCurrentlyExtractingInsurance.deliveryDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolsCurrentlyExtractingInsuranceService.create(this.schoolsCurrentlyExtractingInsuranceForm.value)
        .pipe(switchMap(x => {
			return this.schoolsCurrentlyExtractingInsuranceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolsCurrentlyExtractingInsuranceForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
