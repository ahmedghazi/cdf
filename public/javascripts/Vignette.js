var Vignette = function(){
	var _this = this,
        id,
        $html;

	this.init = function(){
        //_this.bindEvents();
    };

    this.bindEvents = function(){
    	$( "#"+id+" .vignette_inner" ).draggable({
            start: function(event, ui) {
                $(ui.helper[0]).addClass("on_top");
            },
            drag: function(event, ui) {
      
            },
            stop: function(event, ui) {

            },
            snap: true,
            cursor: "move"
        });
    };

    this.render = function(type, _id, d){
        id = _id
        console.log(type, id)
        switch(type){
            case 'cover':
            _this.renderCover(id, "cover");
            break;
            case 'backcover':
            _this.renderCover(id, "backcover");
            break;
            default:
            _this.renderPage(id);
            break;
        }

        _this.animateIn(d);
        _this.bindEvents();
    };

    this.renderCover = function(id, class_name){
        $html = '<article class="vignette '+class_name+'" id="'+id+'" >';
            $html += '<div class="vignette_page " contenteditable="true">';
                $html += '<div class="editable" >TITRE DE L\'ARTICLE</div>';
                $html += '<div class="page_num" contenteditable="false"></div>';
            $html += '</div>';
        $html += '</article>';

        $("#grid_wrapper").append($html);
    };

    this.renderPage = function(id){
        $html = '<article class="vignette page" id="'+id+'" >';
            $html += '<div class="vignette_page " contenteditable="true">';
                $html += '<div class="editable" >TITRE DE L\'ARTICLE</div>';
                $html += '<div class="page_num" contenteditable="false"></div>';
            $html += '</div>';

            $html += '<div class="vignette_page " contenteditable="true">';
                $html += '<div class="editable" >TITRE DE L\'ARTICLE</div>';
                $html += '<div class="page_num" contenteditable="false"></div>';
            $html += '</div>';     
        $html += '</article>';

        $("#grid_wrapper").append($html);
    };

    this.animateIn = function(d){$("#"+id).delay(d).animate({opacity:1},500);}
    this.animateOut = function(d){}
    this.remove = function(){}

};