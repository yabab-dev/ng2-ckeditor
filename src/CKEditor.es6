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
    EventEmitter,
    NgZone
} from 'angular2/core';
import {NgControl, ControlValueAccessor} from 'angular2/common';

/**
 * CKEditor component
 * Usage :
 * <ckeditor [(ngModel)]="data" [config]="{...}" configFile="file.js"></ckeditor>
 */
@Component({
    selector: 'ckeditor',
    template: `<textarea #host></textarea>`,
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
    zone;

    /**
     * Constructor
     */
    constructor(elementRef:ElementRef, ngControl:NgControl, zone:NgZone){
        if( ngControl ){
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }

        this.zone = zone;
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

        // Set initial value
        this.instance.setData(this.value);

        // Change event
        this.instance.on('change', () => {
            this.zone.run(() => {
                let value = this.instance.getData();
                this.change.emit( value );
                this.ngControl.viewToModelUpdate(value);
            });
        });
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
