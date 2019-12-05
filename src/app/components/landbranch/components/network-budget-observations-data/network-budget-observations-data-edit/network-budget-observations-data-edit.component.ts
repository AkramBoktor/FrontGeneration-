
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NetworkBudgetObservationsData } from 'app/shared/models/network-budget-observations-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NetworkBudgetObservationsDataService } from '../shared/network-budget-observations-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-network-budget-observations-data-edit',
  templateUrl: './network-budget-observations-data-edit.component.html',
  styleUrls: ['./network-budget-observations-data-edit.component.scss'],
  providers: []
})

export class NetworkBudgetObservationsDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNetworkBudgetObservationsData: NetworkBudgetObservationsData;
  networkBudgetObservationsDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private networkNoteTypeCodesService: LookupService;
private directionCodesService: LookupService;

  
networkNoteTypeCodeSelectOptions: MaterialSelectOptions;
borderCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('networkNoteTypeCode', { static: true }) NetworkNoteTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('borderCode', { static: true }) BorderCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNetworkBudgetObservationsDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<NetworkBudgetObservationsDataEditComponent>,
    public networkBudgetObservationsDataService: NetworkBudgetObservationsDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNetworkBudgetObservationsData = new NetworkBudgetObservationsData();
    this.selectedNetworkBudgetObservationsData = this.selectedNetworkBudgetObservationsDataDialog.data || this.selectedNetworkBudgetObservationsData;

    
	this.networkNoteTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.networkNoteTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع ملاحظة الشبكة',
	});

	this.borderCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحد',
	});


    this.networkBudgetObservationsDataForm = this.formBuilder.group({
      
  id : [this.selectedNetworkBudgetObservationsData.id],
  landID : [this.selectedNetworkBudgetObservationsData.landID, [ Validators.required ]],
  averageHeightValues : [this.selectedNetworkBudgetObservationsData.averageHeightValues, [ Validators.required ]],
  averageValuesDecline : [this.selectedNetworkBudgetObservationsData.averageValuesDecline, [ Validators.required ]],
  networkNoteTypeCode : [this.selectedNetworkBudgetObservationsData.networkNoteTypeCode, [ Validators.required ]],
  borderCode : [this.selectedNetworkBudgetObservationsData.borderCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.networkBudgetObservationsDataService.update(this.networkBudgetObservationsDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.networkBudgetObservationsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.networkBudgetObservationsDataForm.get(name);
  }

  initializeLookupServices() {
    this.networkNoteTypeCodesService = new LookupService('networknotetypecodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}
