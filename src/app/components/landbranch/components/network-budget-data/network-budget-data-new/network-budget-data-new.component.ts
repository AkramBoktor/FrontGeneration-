
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NetworkBudgetData } from 'app/shared/models/network-budget-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NetworkBudgetDataService } from '../shared/network-budget-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-network-budget-data-new',
  templateUrl: './network-budget-data-new.component.html',
  styleUrls: ['./network-budget-data-new.component.scss'],
  providers: [
    ]
})

export class NetworkBudgetDataNewComponent extends AppBaseComponent implements OnInit {
  networkBudgetDataForm: FormGroup;
  @Input() selectedNetworkBudgetData: NetworkBudgetData;
  errorMessages: FormControlError[] = [
        
  ];

  private directionCodesService: LookupService;

  
directionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('directionCode', { static: true }) DirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NetworkBudgetDataNewComponent>,
    public networkBudgetDataService: NetworkBudgetDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNetworkBudgetData = new NetworkBudgetData();

    
	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاتجاه',
	});


    this.networkBudgetDataForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedNetworkBudgetData.landID, [ Validators.required ]],
  robertLevel : [this.selectedNetworkBudgetData.robertLevel, [ Validators.required ]],
  directionDescription : [this.selectedNetworkBudgetData.directionDescription, [ ]],
  directionCode : [this.selectedNetworkBudgetData.directionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.networkBudgetDataService.create(this.networkBudgetDataForm.value)
        .pipe(switchMap(x => {
			return this.networkBudgetDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.networkBudgetDataForm.get(name);
    }

  initializeLookupServices() {
    this.directionCodesService = new LookupService('directioncodes', this.http);
  }
 }
