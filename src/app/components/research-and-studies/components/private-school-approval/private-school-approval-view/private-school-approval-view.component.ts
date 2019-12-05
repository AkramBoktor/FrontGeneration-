
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PrivateSchoolApproval } from 'app/shared/models/private-school-approval';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateSchoolApprovalService } from '../shared/private-school-approval.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-school-approval-view',
  templateUrl: './private-school-approval-view.component.html',
  styleUrls: ['./private-school-approval-view.component.scss'],
  providers: []
})

export class PrivateSchoolApprovalViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateSchoolApproval: PrivateSchoolApproval;
  privateSchoolApprovalForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateSchoolApprovalDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateSchoolApprovalViewComponent>,
    public privateSchoolApprovalService: PrivateSchoolApprovalService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  complementarySchoolCode : [this.selectedPrivateSchoolApproval.complementarySchoolCode],
  schoolCode : [this.selectedPrivateSchoolApproval.schoolCode],
  approvalDate : [this.selectedPrivateSchoolApproval.approvalDate],
  approvalNumber : [this.selectedPrivateSchoolApproval.approvalNumber],
  approvalType : [this.selectedPrivateSchoolApproval.approvalType],
  notes : [this.selectedPrivateSchoolApproval.notes],
  generalSiteManager : [this.selectedPrivateSchoolApproval.generalSiteManager],
  accreditationBody : [this.selectedPrivateSchoolApproval.accreditationBody],
  classesNumber : [this.selectedPrivateSchoolApproval.classesNumber],
  studentDensity : [this.selectedPrivateSchoolApproval.studentDensity],
  totalCapacity : [this.selectedPrivateSchoolApproval.totalCapacity],
  governorate : [this.selectedPrivateSchoolApproval.governorate],
  qualityCode : [this.selectedPrivateSchoolApproval.qualityCode],
  approvalPosition : [this.selectedPrivateSchoolApproval.approvalPosition],
  schoolDependency : [this.selectedPrivateSchoolApproval.schoolDependency],
  phaseCode : [this.selectedPrivateSchoolApproval.phaseCode]
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
    return this.privateSchoolApprovalForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.privateSchoolApprovalForm.controls)) {
      this.privateSchoolApprovalForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

