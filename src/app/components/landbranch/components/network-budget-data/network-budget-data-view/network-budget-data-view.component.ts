
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NetworkBudgetData } from 'app/shared/models/network-budget-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NetworkBudgetDataService } from '../shared/network-budget-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-network-budget-data-view',
  templateUrl: './network-budget-data-view.component.html',
  styleUrls: ['./network-budget-data-view.component.scss'],
  providers: []
})

export class NetworkBudgetDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNetworkBudgetData: NetworkBudgetData;
  networkBudgetDataForm: FormGroup;

  private directionCodesService: LookupService;

  
directionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNetworkBudgetDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<NetworkBudgetDataViewComponent>,
    public networkBudgetDataService: NetworkBudgetDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNetworkBudgetData = this.selectedNetworkBudgetDataDialog.data || this.selectedNetworkBudgetData;

    
	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاتجاه',
	});


    this.networkBudgetDataForm = this.formBuilder.group({
      
  landID : [this.selectedNetworkBudgetData.landID],
  robertLevel : [this.selectedNetworkBudgetData.robertLevel],
  directionDescription : [this.selectedNetworkBudgetData.directionDescription],
  directionCode : [this.selectedNetworkBudgetData.directionCode]
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
    return this.networkBudgetDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.networkBudgetDataForm.controls)) {
      this.networkBudgetDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

