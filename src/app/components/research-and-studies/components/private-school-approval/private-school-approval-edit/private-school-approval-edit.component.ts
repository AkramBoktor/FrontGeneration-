
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PrivateSchoolApproval } from 'app/shared/models/private-school-approval';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PrivateSchoolApprovalService } from '../shared/private-school-approval.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-private-school-approval-edit',
  templateUrl: './private-school-approval-edit.component.html',
  styleUrls: ['./private-school-approval-edit.component.scss'],
  providers: []
})

export class PrivateSchoolApprovalEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateSchoolApproval: PrivateSchoolApproval;
  privateSchoolApprovalForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private educationTypesService: LookupService;
private yesOrNosService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
qualityCodeSelectOptions: MaterialSelectOptions;
approvalPositionSelectOptions: MaterialSelectOptions;
schoolDependencySelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('qualityCode', { static: true }) QualityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('approvalPosition', { static: true }) ApprovalPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('schoolDependency', { static: true }) SchoolDependencySelectComponent: MaterialSelectComponent;
	@ViewChild('phaseCode', { static: true }) PhaseCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateSchoolApprovalDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateSchoolApprovalEditComponent>,
    public privateSchoolApprovalService: PrivateSchoolApprovalService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateSchoolApproval = new PrivateSchoolApproval();
    this.selectedPrivateSchoolApproval = this.selectedPrivateSchoolApprovalDialog.data || this.selectedPrivateSchoolApproval;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.qualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود النوعية',
	});

	this.approvalPositionSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الموافقة',
	});

	this.schoolDependencySelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تبعية مدرسة خ',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});


    this.privateSchoolApprovalForm = this.formBuilder.group({
      
  id : [this.selectedPrivateSchoolApproval.id],
  complementarySchoolCode : [this.selectedPrivateSchoolApproval.complementarySchoolCode, [ Validators.required ]],
  schoolCode : [this.selectedPrivateSchoolApproval.schoolCode, [ Validators.required ]],
  approvalDate : [this.selectedPrivateSchoolApproval.approvalDate, [ Validators.required ]],
  approvalNumber : [this.selectedPrivateSchoolApproval.approvalNumber, [ Validators.required ]],
  approvalType : [this.selectedPrivateSchoolApproval.approvalType, [ Validators.required ]],
  notes : [this.selectedPrivateSchoolApproval.notes, [ Validators.required ]],
  generalSiteManager : [this.selectedPrivateSchoolApproval.generalSiteManager, [ Validators.required ]],
  accreditationBody : [this.selectedPrivateSchoolApproval.accreditationBody, [ Validators.required ]],
  classesNumber : [this.selectedPrivateSchoolApproval.classesNumber, [ Validators.required ]],
  studentDensity : [this.selectedPrivateSchoolApproval.studentDensity, [ Validators.required ]],
  totalCapacity : [this.selectedPrivateSchoolApproval.totalCapacity, [ Validators.required ]],
  governorate : [this.selectedPrivateSchoolApproval.governorate, [ Validators.required ]],
  qualityCode : [this.selectedPrivateSchoolApproval.qualityCode, [ Validators.required ]],
  approvalPosition : [this.selectedPrivateSchoolApproval.approvalPosition, [ Validators.required ]],
  schoolDependency : [this.selectedPrivateSchoolApproval.schoolDependency, [ Validators.required ]],
  phaseCode : [this.selectedPrivateSchoolApproval.phaseCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.privateSchoolApprovalService.update(this.privateSchoolApprovalForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.privateSchoolApprovalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.privateSchoolApprovalForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}
