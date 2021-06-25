 function mediaItem(type, size, events = {}){
 	let me = {};

	let imageEts = ['jpg', 'jpeg', 'png', 'webpx', 'webp'];
	let videoEts = ['mp4', 'ogg', 'flv'];
	let videoUrlEts = ['com/embed'];

	function get_url_extension( url ) {
	    return url.split(/[#?]/)[0].split('.').pop().trim();
	}

	function getFileType(path){
		let extension = get_url_extension(path);
		if(imageEts.includes(extension))
			return 'image';
		if(videoEts.includes(extension) || path.includes(videoUrlEts))
			return 'video';
		return 'file';
	}


	function pathItem(path){
		return eItem(`<div class="finder-item finder-item-path">${path}</div>`, path);
	}

	function imageItem(path){
		return eItem(`<div class="finder-item finder-item-image"><img width="${size[0]}" height="${size[1]}" src="${path}" /></div>`, path);
	}

	function videoItem(path){
		return eItem(`<div class="finder-item finder-item-video"><video width="${size[0]}" height="${size[1]}" controls>
		  <source src="${path}" type="video/mp4">
		</video></div>`, path);
	}

	function videoUrl(path){
		return eItem(`<div class="finder-item finder-item-video">
			<iframe width="${size[0]}" height="${size[1]}" src="${path}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>`, path);
	}

	function eItem(html, path){	

		function removeItem(target){
			let eRemove = $(`<div class="finder-item-remove">x</div>`);
			target.append(eRemove);
			eRemove.click(function(){
				if(typeof events.onBeforeRemove == 'function')
					events.onBeforeRemove();
				eRemove.remove();
				target.remove();
				events.onRemove();
			});
			return eRemove;
		}

		let target = $(html);
		target[0].media_path = path; 
		if(typeof events.onRemove == 'function')
			removeItem(target);
		return target;
	}

	me.get = function(path){
		if(!path){
			return false;
		}
		let el = null;
		let _type = type;
		if(type == 'any')
			_type = getFileType(path);
    	if(_type == 'image')
    		el = imageItem(path);
    	else if(_type == 'video'){
    		if(path.includes('http'))
	    		el = videoUrl(path);
	    	else
	    		el = videoItem(path);
    	}
    	else
    		el = pathItem(path);
    	
    	return el;
	}

	return me;
}
