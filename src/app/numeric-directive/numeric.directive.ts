import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[numeric]'
})
export class NumericDirective {

  @Input('decimals') decimals: number = 0;
  @Input('length') length: number = 19;

  private check(value: string, decimals: number) {
    // console.log(value)
    if (this.length > 0) {
      if (decimals == 0) {
        //   return String(value).match(new RegExp(/^\d+$/));
        var regExpString = "^\\d{0," + this.length + "}$"
        return String(value).match(new RegExp(regExpString));
      } else {
        var regExpString = "^\\s*(\\-?(\\d{0," + this.length + "}(\\.\\d{0," + decimals + "})?|(\\-?(\\d{0," + this.length + "}(\\.\\d{1," + decimals + "}))))|\\-?)\\s*$"
        // var regExpString = "^\\s*0\\s*$|^(?!0+\\.00)(?=.{1," + this.length + "}(\\.|$))(?!0(?!\\.))\\d{1,3}(,\\d{3})*((\\.\\d{1," + decimals + "})|\\.?)?$"
        // console.log(new RegExp(regExpString))
        // console.log(String(value).match(new RegExp(regExpString)));
        return String(value).match(new RegExp(regExpString));
      }
    }
    return null;
  }

  private specialKeys = [
    'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'BackSpace'
  ];


  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = this.el.nativeElement.value;
    let next: string = "";
    if (event.key === 'Backspace') {
      next = current
    }
    else
      next = current.substring(0, this.el.nativeElement.selectionStart) + event.key + current.substring(this.el.nativeElement.selectionEnd)
    // console.log('current : ' + current)
    // console.log('next : ' + next)
    if (next && !this.check(next, this.decimals)) {
      event.preventDefault();
    }
    // console.log("1")

  }

}

@Directive({
  selector: '[numericPersen]'
})
export class NumericPersenDirective {

  @Input('decimals') decimals: number = 0;

  private check(value: string, decimals: number) {
    if (decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
      // return String(value).match(new RegExp(/^-?\d*\.{0,1}\d+$/));
    } else {
      var regExpString = "^\\s*100\\s*$|^\\s*(\\-?(\\d{0,2}(\\.\\d{0," + decimals + "})?|(\\-?(\\d*(\\.\\d{1," + decimals + "}))))|\\-?)\\s*$"
      // console.log(regExpString)
      // console.log(String(value).match(new RegExp(regExpString)));
      return String(value).match(new RegExp(regExpString));
    }

  }

  private specialKeys = [
    'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'BackSpace'
  ];


  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = this.el.nativeElement.value;
    // let next: string = current.substring(0, this.el.nativeElement.selectionStart) + event.key + current.substring(this.el.nativeElement.selectionEnd)
    let next: string = "";
    if (event.key === 'Backspace') {
      // console.log(current.indexOf("."))
      // console.log(this.el.nativeElement.selectionStart)
      // console.log(this.el.nativeElement.selectionEnd)
      if (current.indexOf(".") === this.el.nativeElement.selectionStart - 1 && current.indexOf(".") === this.el.nativeElement.selectionEnd - 1)
        next = current.split(".").join("")
      else
        next = current
    }
    else
      next = current.substring(0, this.el.nativeElement.selectionStart) + event.key + current.substring(this.el.nativeElement.selectionEnd)
    // console.log('current : ' + current)
    // console.log('next : ' + next)
    if (next && !this.check(next, this.decimals)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  setValueFunc() {
    let value: string = this.el.nativeElement.value;
    if (value.indexOf(".") === 0) {
      this.el.nativeElement.value = parseFloat(value);
    }

  }
}

@Directive({
  selector: '[numericSeparator]',
  exportAs: 'numericSeparator'
})
export class NumericSeparator {

  constructor(public el: ElementRef) { }

  @Output() setValue = new EventEmitter<number>();

  @HostListener('blur', ['$event'])
  setValueFunc() {
    let value: string = this.el.nativeElement.value;
    if (value.indexOf(".") === (value.length - 1)) {
      value = value.substring(0, value.length - 1);
      this.el.nativeElement.value = value;
    }
    if (value)
      this.setValue.emit(parseFloat(value.split(",").join("")));
    else
      this.setValue.emit(null);

  }

  @HostListener('input', ['$event'])
  setSeparator() {
    let oldValue: string = this.el.nativeElement.value;
    let selectStart: number = this.el.nativeElement.selectionStart;
    let selectEnd: number = this.el.nativeElement.selectionEnd;
    let removeComma: string = oldValue.split(",").join("");
    if (removeComma.indexOf(".") === 0)
      removeComma = "0" + removeComma;
    if (removeComma) {
      let split = removeComma.split(".");
      if (split.length > 1) {
        if (split[0].split(",").length > 1)
          this.el.nativeElement.value = split[0] + "." + split[1];
        else
          this.el.nativeElement.value = parseInt(split[0]).toLocaleString() + "." + split[1];
      } else {
        if (split[0].split(",").length > 1)
          this.el.nativeElement.value = split[0];
        else
          this.el.nativeElement.value = parseInt(split[0]).toLocaleString();
      }
      // console.log("element", this.el.nativeElement)
      // console.log("oldValue", oldValue)
      // console.log("new", this.el.nativeElement.value)
      // console.log("before", selectEnd)
      // console.log("before", selectEnd)
      if (oldValue.indexOf(".") === 0) {
        this.el.nativeElement.selectionStart = 1;
        this.el.nativeElement.selectionEnd = 1;
      } else if (oldValue.length > this.el.nativeElement.value.length) {
        if (selectStart) {
          this.el.nativeElement.selectionStart = selectStart - 1;
          this.el.nativeElement.selectionEnd = selectEnd - 1;
        } else {
          this.el.nativeElement.selectionStart = selectStart;
          this.el.nativeElement.selectionEnd = selectEnd;
        }
        // console.log("after1", this.el.nativeElement.selectionStart)
        // console.log("after1", this.el.nativeElement.selectionEnd)
      } else if (oldValue.length < this.el.nativeElement.value.length) {
        if (selectStart) {
          this.el.nativeElement.selectionStart = selectStart + 1;
          this.el.nativeElement.selectionEnd = selectEnd + 1;
        } else {
          this.el.nativeElement.selectionStart = selectStart;
          this.el.nativeElement.selectionEnd = selectEnd;
        }
        // console.log("after2", this.el.nativeElement.selectionStart)
        // console.log("after2", this.el.nativeElement.selectionEnd)
      } else if (oldValue.length === this.el.nativeElement.value.length) {
        this.el.nativeElement.selectionStart = selectStart;
        this.el.nativeElement.selectionEnd = selectEnd;
        // console.log("after3", this.el.nativeElement.selectionStart)
        // console.log("after3", this.el.nativeElement.selectionEnd)
      }
    }
  }
}
