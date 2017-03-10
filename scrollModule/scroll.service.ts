import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class ScrollService{
	scrollTop:Subject<number>=new Subject();
	constructor(){};
	controlNodes=[];
	name:string='bb';
	getAbsoluteTop(node){
		let top=node.offsetTop;
		if(node.offsetParent) top+=this.getAbsoluteTop(node.offsetParent);
		return top;
	}
}
