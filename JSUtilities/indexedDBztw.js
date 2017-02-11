
function IndexedDBztw(options){
	/*instance:
		options:{
			db:'myData'
			version:1,
			colle:'myColle',
			keyPath:'name'
		}
	*/
	"use strict";
	var db=options.db,
		version=options.version,
		colle=options.colle,
		keyPath=options.keyPath;
	var initModel=function(db,objectStore){
		var model={};
		var againCreate=()=>{
			objectStore=db.transaction(colle,'readwrite').objectStore(colle);
		}
		model.removeOldOne=()=>{
				return new Promise((resolve,reject)=>{
					againCreate();
					var index=objectStore.index('ztwDate');
					index.openCursor().onsuccess=(e)=>{
						var cursor=e.target.result;
						var item=cursor.value[keyPath];
						objectStore.delete(item).onsuccess=(e)=>{
							resolve(e.target.result);
						}
					}
				})
		}
		model.count=()=>{
			return new Promise((resolve,reject)=>{
			againCreate();
			objectStore.count().onsuccess=(e)=>{
				resolve(e.target.result);
				}
			})
		}

		model.find=(item)=>{
			if(!item)return;
			return new Promise((resolve,reject)=>{
				againCreate();
				objectStore.get(item).onsuccess=(e)=>{
					resolve(e.target.result);
				}
			})
		}
		model.insert=(obj)=>{
			if(!obj)return;
			obj.ztwDate=(new Date()).getTime();
			return new Promise((resolve,reject)=>{
				againCreate();
				objectStore.add(obj).onsuccess=(e)=>{
					resolve(e.target.result);
				}
			})
		}
		model.update=(obj)=>{
			if(!obj)return;
			return new Promise((resolve,reject)=>{
				againCreate();
				objectStore.put(obj).onsuccess=(e)=>{
					resolve(e.target.result);
				}
			})
		}
		model.remove=(item)=>{
			if(!item)return;
			return new Promise((resolve,reject)=>{
				againCreate();
				objectStore.delete(item).onsuccess=(e)=>{
					resolve(e.target.result);
				}
			})
		}
		return model;
	}
	return	new Promise((resolve,reject)=>{
			var indexed= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			var req=indexed.open(db,version);
			req.onupgradeneeded=(e)=>{
				var db=e.target.result;
				var objectStore;
				!db.objectStoreNames.contains(colle)?objectStore=db.createObjectStore(colle,{keyPath:keyPath}):0;
				objectStore.createIndex('ztwDate','ztwDate',{unique:true});
				objectStore.transaction.oncomplete=(e)=>{
					var myO=db.transaction(colle,'readwrite').objectStore(colle);
					resolve(initModel(db,myO));
				}
			};

			req.onsuccess=(e)=>{
				var db=e.target.result;
				var objectStore=db.transaction(colle,'readwrite').objectStore(colle);	
				
				resolve(initModel(db,objectStore));
			}
		})		
}
	
	
	
function cappedLogIndexedDB(obj,opt={size:10}){
		/*
		opt:   { size:10};
		*/
		return new Promise((resolve,reject)=>{
			IndexedDBztw(obj).then(model=>{
				var size=opt.size,customModel={};
				customModel.__proto__=model;
				customModel.insert=(obj)=>{
					new Promise((resolve,reject)=>{
						model.count().then(num=>{
							if(num>=size){
								model.removeOldOne().then(v=>{
									model.insert(obj).then(v=>{
										resolve(v)
									})
								})
							}else{
								model.insert(obj).then(v=>{
									resolve(v);
								})
							}
						})
					})
				}
				resolve(customModel);		
			})
		})
}
