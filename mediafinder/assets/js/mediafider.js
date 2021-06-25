/*
 * This is a sample JavaScript file used by mediafinder
 *
 * You can delete this file if you want
 */

$.fn.mediafinder = function(params = {}){
	let me 		= this;
	let type 	= params.type;
	let size 	= [params.width?? 100, params.height?? 100];
	let isMulti = params.isMulti?? false;
	let value 	= [];
	let onChange = (typeof params.onChange == 'function')? params.onChange: function(){};
	let _target = null;

	try {
        value = JSON.parse(params.value);
    } catch(e) {
        console.log(e); // error in the above string (in this case, yes)!
    }

	let finderItem = (function finderItem(){
		let efinder = $(`<div class="finder-item finder-item-add" title="Insert files">
			<i class="icon-plus"></i></div>`);
		efinder.click(function(){mediafiderOpen(efinder)});
		return efinder;
	})();

	function onSuccess(eContainer){
	    if(_target != finderItem){
	    	finderItem.append(eContainer);
	    	_target.remove();
	    }
		updateTrigerValue();
	    eContainer.hide();
	}

	function updateTrigerValue(){
		let childs = me.children();
		let value = [];
		for(let i in childs)
		{
			if(childs[i].media_path)
				value.push(childs[i].media_path);
		}
		onChange(JSON.stringify(value));
	}

	let choiseAction = (function(){
		let eContainer = $(`<ul class="finder-action" tabindex="3"><div class="finder-title">Insert '${type}' Files</div></ul>`)
		let eSelect = $(`<li class="finder-action-select"><i class="icon-file-image-o"></i>Select files</li>`);
		let eUrl = $(`<form class="finder-action-item url-box"></form>`);
		let eInput = $(`<input class="finder-action-input" type="text" placeholder="Enter file url" />`);
		let eButton = $(`<input class="finder-action-input" type="submit">`);
		let isOver = true;
		eUrl.append([eInput, eButton]);
		eContainer.append([eSelect, eUrl]);
		eInput.blur(function(){
			isOver = true;
			setTimeout(function(){
				if(isOver)
					eContainer.hide();
			}, 144);
		});

		eSelect.click(function(){
			new $.oc.mediaManager.popup({
				alias: 'ocmediamanager',
				cropAndInsertButton: true,
				onInsert: function(items) {
				    for(let i in items){
				    	let path 		= items[i].path;
				    	let publicUrl 	= items[i].publicUrl;
				    	// appendItem(_target, (['image', 'video'].includes(type))? publicUrl: path);
				    	appendItem(_target, publicUrl);
				    }
				    onSuccess(eContainer);
				    this.hide();
				}
	        });
		});

		eUrl.submit(function(e){
			e.preventDefault();
			let path = eInput.val();
			appendItem(_target, path);
			onSuccess(eContainer);
		});

		eContainer._show = function(){
			isOver = false;
			eContainer.show();
			eInput.focus();
		}

		eContainer.hide();
		return eContainer;
	})();

	let mediaitem = mediaItem(type, size, {
		onRemove:function(){
			updateTrigerValue();
		},
		onBeforeRemove: function(){
			finderItem.append(choiseAction);
		}
	});

	function appendItem(target, path){
		let el = mediaitem.get(path, type);
		el.insertAfter(target);
		el.click(function(){mediafiderOpen(el)});
	}

	function mediafiderOpen(target){
		if(target != _target)
			target.append(choiseAction);
		_target = target;
		choiseAction._show();
	}

	(function init(){
		me.append(finderItem);
		for(let i = value.length - 1; i >= 0; i--){
			appendItem(finderItem, value[i]);
		}
	})();

}