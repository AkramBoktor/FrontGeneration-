
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LabData } from 'app/shared/models/lab-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LabDataService } from '../shared/lab-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-lab-data-new',
  templateUrl: './lab-data-new.component.html',
  styleUrls: ['./lab-data-new.component.scss'],
  providers: [
    ]
})

export class LabDataNewComponent extends AppBaseComponent implements OnInit {
  labDataForm: FormGroup;
  @Input() selectedLabData: LabData;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private yesOrNoService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
existingSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('existing', { static: true }) ExistingSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LabDataNewComponent>,
    public labDataService: LabDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLabData = new LabData();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.existingSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موجود ',
	});


    this.labDataForm = this.formBuilder.group({
     
  id : [0],
  laboratoryCode : [this.selectedLabData.laboratoryCode, [ Validators.required ]],
  laboratoryAddress : [this.selectedLabData.laboratoryAddress, [ Validators.required ]],
  workPhone : [this.selectedLabData.workPhone, [ Validators.required ]],
  laboratoryManger : [this.selectedLabData.laboratoryManger, [ Validators.required ]],
  basicMatrial : [this.selectedLabData.basicMatrial, [ Validators.required ]],
  subMatrial : [this.selectedLabData.subMatrial, [ Validators.required ]],
  testingCode : [this.selectedLabData.testingCode, [ Validators.required ]],
  testingName : [this.selectedLabData.testingName, [ Validators.required ]],
  branchCode : [this.selectedLabData.branchCode, [ Validators.required ]],
  existing : [this.selectedLabData.existing, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.labDataService.create(this.labDataForm.value)
        .pipe(switchMap(x => {
			return this.labDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.labDataForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
 }
