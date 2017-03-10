import {Component,Input,ContentChildren,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import {ScrollBindDirective} from './scrollBind.directive';
interface OffsetControl{
  top:number;
  bottom:number;
  mid:number;
  value:any;
  over?:any;
}
@Component({
	selector:'ztwScroll',
  template:` <ng-content></ng-content>` ,
  providers:[
    { provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ScrollComponent),
      multi:true
    }
  ]

})
export class ScrollComponent{
  @ContentChildren(ScrollBindDirective)controls;
	@Input('baseLine')private baseLine:number;
	@Input('throttleTime')private throttleTime:number;
	private scrollOb:Observable<any>=Observable.fromEvent(window,'scroll');
	private offsetControls:Array<OffsetControl>;
	storeMsn:any;
	emit:any=()=>{};
	changeEmit:any=(msn)=>{
	  if(this.storeMsn!==msn){
	    this.emit(msn);
	    this.storeMsn=msn;
    }
  };
  ngAfterContentInit(){
	    let bodySize:any,scrollTop:number,scrollBottom:number,scrollBound:number;
		  this.baseLine=this.baseLine||0;
		  this.throttleTime=this.throttleTime||0;
		  this.calControls();
		  let getScrollTop=()=>{

      };
		  this.scrollOb.throttleTime(this.throttleTime).subscribe(v=>{
        scrollTop=document.documentElement.scrollTop||document.querySelector('body').scrollTop;
        scrollBottom=scrollTop+window.innerHeight;
        for (let i of this.offsetControls){
          scrollBound=i.over==='bottom'?scrollBottom:scrollTop;
          if(scrollBound>=i.top&&scrollBound<=i.bottom){
            this.changeEmit(i.value);
            return;
          }
        }
        this.changeEmit('out');
      });
      this.scrollOb.throttleTime(200).subscribe(v=>{
         let height=document.querySelector('body').scrollHeight;
         if(height==bodySize)return;
         bodySize =height;
         this.calControls();
      });
  };
  calControls(){
    this.offsetControls=[];
    this.controls.map(control=>{
      let node=control.el.nativeElement,
          offsetControl:any={};
      offsetControl.top=this.getAbsoluteTop(node)-this.baseLine;
      offsetControl.bottom=offsetControl.top+node.offsetHeight;
      offsetControl.mid=Math.round((offsetControl.top+offsetControl.bottom)/2);
      offsetControl.value=control.value;
      offsetControl.over=control.over;
      this.offsetControls.push(offsetControl);
    });
  };
  scrollTo(value){
    for(let i of this.offsetControls){
      if(i.value==value){
        window.scrollTo(0,i.top);
        break;
      };
    }
  };
  getAbsoluteTop(node){
    let top=node.offsetTop;
    if(node.offsetParent) top+=this.getAbsoluteTop(node.offsetParent);
    return top;
  }
  registerOnTouched(){};
  registerOnChange(fn:any){
    this.emit=fn;
  };
  writeValue(value){
    this.offsetControls?this.scrollTo(value):0;
  };
}
