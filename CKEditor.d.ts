// Imports
import {
    ElementRef,
    EventEmitter
} from '@angular/core';
import {NgControl, ControlValueAccessor} from '@angular/common';

/**
 * CKEditor component
 */
export declare class CKEditor implements ControlValueAccessor {

    value:any;
    instance:any;
    change:EventEmitter<any>;

    constructor(elementRef:ElementRef, ngControl:NgControl);
    ckeditorInit(config:any):void;
    hackUpdate():void;

    // ControlValueAccessor
    writeValue(value:any):void;
    onChange(_:any):void;
    registerOnChange(fn:Function):void;
    registerOnTouched(fn:Function):void;
    
}
