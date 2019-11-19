
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataForAnItemContainingOtherItems } from 'app/shared/models/data-for-an-item-containing-other-items';
import { switchMap } from 'rxjs/operators';
import { DataForAnItemContainingOtherItemsService } from '../shared/data-for-an-item-containing-other-items.service';




@Component({
  selector: 'app-data-for-an-item-containing-other-items-edit',
  templateUrl: './data-for-an-item-containing-other-items-edit.component.html',
  styleUrls: ['./data-for-an-item-containing-other-items-edit.component.scss'],
  providers: []
})

export class DataForAnItemContainingOtherItemsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataForAnItemContainingOtherItems: DataForAnItemContainingOtherItems;
  dataForAnItemContainingOtherItemsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataForAnItemContainingOtherItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataForAnItemContainingOtherItemsEditComponent>,
    public dataForAnItemContainingOtherItemsService: DataForAnItemContainingOtherItemsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataForAnItemContainingOtherItems = new DataForAnItemContainingOtherItems();
    this.selectedDataForAnItemContainingOtherItems = this.selectedDataForAnItemContainingOtherItemsDialog.data || this.selectedDataForAnItemContainingOtherItems;

    

    this.dataForAnItemContainingOtherItemsForm = this.formBuilder.group({
      
  id : [this.selectedDataForAnItemContainingOtherItems.id],
  itemNumber : [this.selectedDataForAnItemContainingOtherItems.itemNumber, [ Validators.required ]],
  basicItemNumber : [this.selectedDataForAnItemContainingOtherItems.basicItemNumber, [ Validators.required ]],
  quantity : [this.selectedDataForAnItemContainingOtherItems.quantity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataForAnItemContainingOtherItemsService.update(this.dataForAnItemContainingOtherItemsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataForAnItemContainingOtherItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataForAnItemContainingOtherItemsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
