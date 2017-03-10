

app.module:

	import {ZTWScrollModule} from './ztw-scroll.module';
	imports:[ZTWScrollModule];

use it as follow:	
component:

`<ztwScroll [(ngModel)]='scrollValue'>`

	<div  value='1' ztwScrollControl>one</div>
	<div  value='2' ztwScrollControl>two</div>	
	<div  value='3' ztwScrollControl>three</div>
	
`</ztwScroll>`

when body.scrollTop scrolled control,you can get scrollValue that the value of control.value;


`<ztwScroll [throttleTime]='100' [baseLine]='50' [(ngModel)]='scrollValue'>`
If you want scrolled your navBar which is fixed on the top,you can set `baseLine`;

The  default value of the `throttleTime`  is 0;

