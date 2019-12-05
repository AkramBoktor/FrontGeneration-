
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NetworkBudgetData } from 'app/shared/models/network-budget-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NetworkBudgetDataService } from '../shared/network-budget-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-network-budget-data-edit',
  templateUrl: './network-budget-data-edit.component.html',
  styleUrls: ['./network-budget-data-edit.component.scss'],
  providers: []
})

export class NetworkBudgetDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNetworkBudgetData: NetworkBudgetData;
  networkBudgetDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private directionCodesService: LookupService;

  
directionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('directionCode', { static: true }) DirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNetworkBudgetDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<NetworkBudgetDataEditComponent>,
    public networkBudgetDataService: NetworkBudgetDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNetworkBudgetData = new NetworkBudgetData();
    this.selectedNetworkBudgetData = this.selectedNetworkBudgetDataDialog.data || this.selectedNetworkBudgetData;

    
	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاتجاه',
	});


    this.networkBudgetDataForm = this.formBuilder.group({
      
  id : [this.selectedNetworkBudgetData.id],
  landID : [this.selectedNetworkBudgetData.landID, [ Validators.required ]],
  robertLevel : [this.selectedNetworkBudgetData.robertLevel, [ Validators.required ]],
  directionDescription : [this.selectedNetworkBudgetData.directionDescription, [ ]],
  directionCode : [this.selectedNetworkBudgetData.directionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.networkBudgetDataService.update(this.networkBudgetDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.networkBudgetDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.networkBudgetDataForm.get(name);
  }

  initializeLookupServices() {
    this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}
