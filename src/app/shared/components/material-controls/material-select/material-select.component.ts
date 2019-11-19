import { Component, Input, OnInit, Optional, Self, ViewChild, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { isObservable, Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { catchError, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss']
})
export class MaterialSelectComponent implements OnInit, ControlValueAccessor {

  @Input() options: MaterialSelectOptions;
  @Input() disabled = false;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('CdkVirtualScrollViewport', { static: false }) virtualScroll: CdkVirtualScrollViewport;
  @ViewChild('matSelect', { static: true }) matSelect: MatSelect;

  selectedOption: any;

  matSelectInput = new FormControl();

  viewData: any[];

  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.matSelect.errorStateMatcher = {
      isErrorState: () => {
        return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
      }
    };
    this.populateList(this.options.data);
    this.setDisabledState(this.options.disabled || this.disabled || this.control.disabled);
  }

  onChanged(value) {
    this.propagateChange(value);
    this.selectionChanged.emit(value);
    this.matSelect.updateErrorState();
  }

  onTouched() {
    this.propagateTouched();
    this.matSelect.updateErrorState();
  }

  setValue(newValue: any) {
    this.matSelectInput.setValue(newValue);
  }

  populateList(dataSource: Observable<any[]> | any[]) {
    if (isObservable(dataSource)) {
      dataSource
        .subscribe(d => {
            this.viewData = d;
            this.setValue(this.selectedOption);
          });
    } else {
      this.viewData = dataSource;
      this.setValue(this.selectedOption);
    }
  }

  populateListByFilter(dataSource: Observable<any[]> | any[]) {
    if (isObservable(dataSource)) {
      dataSource.subscribe(d => {
        this.viewData = d;
        if (this.viewData.length > 0) {
          this.setValue(null);
          this.setValue(this.viewData[0].code);
        }
      }, (error: HttpErrorResponse) => console.log(error.message));
    } else {
      this.viewData = dataSource;
      if (this.viewData.length > 0) {
        this.setValue(this.viewData[0].code);
      }
    }
  }
  get errorState() {
    return this.control.errors !== null && !!this.control.touched;
  }

  // Todo: Better implementation.
  onViewPortOpened() {
    // this.virtualScroll.scrollToIndex(1);
    // this.virtualScroll.scrollToIndex(0);
  }

  trackByFn(index, item) {
    return index;
  }



  private propagateChange = (_: any) => { };
  private propagateTouched = () => { };

  writeValue(val: any): void {
    this.selectedOption = val;
    this.matSelectInput.setValue(val);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.matSelect.setDisabledState(isDisabled); // disabled = isDisabled;
  }

  compareFn(x: any, y: any): boolean {
    return x && y ? x.code === y.code : x === y;
  }
}
