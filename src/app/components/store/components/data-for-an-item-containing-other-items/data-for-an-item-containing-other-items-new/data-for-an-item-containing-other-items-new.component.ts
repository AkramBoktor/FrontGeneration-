
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataForAnItemContainingOtherItems } from 'app/shared/models/data-for-an-item-containing-other-items';
import { switchMap } from 'rxjs/operators';
import { DataForAnItemContainingOtherItemsService } from '../shared/data-for-an-item-containing-other-items.service';


@Component({
  selector: 'app-data-for-an-item-containing-other-items-new',
  templateUrl: './data-for-an-item-containing-other-items-new.component.html',
  styleUrls: ['./data-for-an-item-containing-other-items-new.component.scss'],
  providers: [
    ]
})

export class DataForAnItemContainingOtherItemsNewComponent extends AppBaseComponent implements OnInit {
  dataForAnItemContainingOtherItemsForm: FormGroup;
  @Input() selectedDataForAnItemContainingOtherItems: DataForAnItemContainingOtherItems;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataForAnItemContainingOtherItemsNewComponent>,
    public dataForAnItemContainingOtherItemsService: DataForAnItemContainingOtherItemsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataForAnItemContainingOtherItems = new DataForAnItemContainingOtherItems();

    

    this.dataForAnItemContainingOtherItemsForm = this.formBuilder.group({
     
  id : [0],
  itemNumber : [this.selectedDataForAnItemContainingOtherItems.itemNumber, [ Validators.required ]],
  basicItemNumber : [this.selectedDataForAnItemContainingOtherItems.basicItemNumber, [ Validators.required ]],
  quantity : [this.selectedDataForAnItemContainingOtherItems.quantity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataForAnItemContainingOtherItemsService.create(this.dataForAnItemContainingOtherItemsForm.value)
        .pipe(switchMap(x => {
			return this.dataForAnItemContainingOtherItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataForAnItemContainingOtherItemsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
