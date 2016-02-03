// Imports
import {
    Component,
    Directive,
    Input,
    Output,
    ElementRef,
    ViewChild,
    Optional,
    OptionalMetadata,
    EventEmitter
} from 'angular2/core';
import {NgControl, ControlValueAccessor} from 'angular2/common';

/**
 * CKEditor component
 * Usage :
 * <ckeditor [(ngModel)]="data" [config]="{...}" configFile="file.js"></ckeditor>
 */
@Component({
    selector: 'ckeditor',
    template: `<textarea #host></textarea>
    <button (click)="hackUpdate($event)" #button></button>`,
})
@Reflect.metadata('parameters', [null, [new OptionalMetadata()]])
export class CKEditor {

    @Input() config;
    @Input() configFile;

    @Output() change = new EventEmitter();
    @ViewChild('host') host;
    @ViewChild('button') button;

    value = '';
    instance = null;
    ngControl;

    // Hack button
    _buttonEl;

    /**
     * Constructor
     */
    constructor(elementRef:ElementRef, ngControl:NgControl){
        if( ngControl ){
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
    }

    /**
     * On component destroy
     */
    ngOnDestroy(){
        if( this.instance ) {
            this.instance.removeAllListeners();
            this.instance.destroy();
            this.instance = null;
        }
    }

    /**
     * On component view init
     */
    ngAfterViewInit(){
        // Configuration
        var config = {};

        // Fetch file
        if( this.configFile ){

            if( System && System.import ){
                System.import(this.configFile)
                    .then((res) => {
                        this.ckeditorInit( res.config );
                    })
            }

        // Config object
        }else{
            config = this.config || {};
            this.ckeditorInit( config );
        }
    }

    /**
     * CKEditor init
     */
    ckeditorInit( config ){
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace( this.host._appElement.nativeElement, config );

        // Hide hack button
        this._buttonEl = this.button._appElement.nativeElement;
        this._buttonEl.style.display = 'none';

        // Set initial value
        this.instance.setData(this.value);

        // Change event
        this.instance.on('change', () => {
            var value = this.instance.getData();

            // This doesn't work ???
            /*this.onChange( value );
            this.change.emit( value );
            this.ngControl.viewToModelUpdate(value);*/

            // Hack
            this._buttonEl.dispatchEvent(new Event('click'))
        });
    }

    /**
     * Hack to update model
     */
    hackUpdate(){
        if( this.instance ){
            var value = this.instance.getData();
            this.ngControl.viewToModelUpdate(value);
            //this.onChange( value );
            this.change.emit( value );
        }
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value){
        this.value = value;
        if( this.instance )
            this.instance.setData(value);
    }
    onChange(_){}
    onTouched(){}
    registerOnChange(fn){this.onChange = fn;}
    registerOnTouched(fn){this.onTouched = fn;}
}
