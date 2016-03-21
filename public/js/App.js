var App = function(){
	var _this = this,
        $container = $('#grid_wrapper'),
        itemElems;

	this.init = function(){
        _this.bindEvents();
        _this.render();
    };

    this.bindEvents = function(){
        $("form[name='create']").on("submit", function(event){
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/api/c",
                data: $(this).serialize(), // serializes the form's elements.
                success: function(data)
                {
                   console.log(data.response)
                   location.href = "/cdf/"+data.response._id
                }
             });
        });

        $("form[name='update']").on("submit", function(event){
            event.preventDefault();
            var id = $('input[name="id"]').val();
            //var content = $("#grid_wrapper").html();
            $('input[name="content"]').val($("#grid_wrapper").html());

            $.ajax({
                type: "POST",
                url: "/api/u/"+id,
                data: $(this).serialize(), // serializes the form's elements.
                success: function(data)
                {
//                   console.log(data.response)
                   location.href = "/cdf/"+id+"/"+data.version;
                }
             });
        });

        $("body").mousemove(function(e){
            target = e.target;
        });



    	$( ".vignette_inner" ).draggable({
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

        $("#grid_wrapper").on("click", function(event){
            if($("body").hasClass("tool_delete")){
                if($(event.target) == $(this))return;

                //console.log(event.target)
                $container.packery( 'remove', $(event.target).closest( "article" ) );
                $container.packery();
                _this.reload();
            }
        });

        $('#delete').on("click", function(event){
            event.preventDefault();
            $("body").toggleClass("tool_delete")
            if($("body").hasClass("tool_delete"))
                $(this).text("Deleting")
            else 
                $(this).text("Delete")
            //$container.packery( 'remove', event.target );
            // layout remaining item elements
            //$container.packery();
        });

        $("#add").on("click", function(event){
            event.preventDefault();
            $("body").removeClass("tool_delete")
            $element = $('<article class="vignette page "><div class="vignette_page"><div contenteditable="true" class="carre editable"></div><div class="page_num"></div></div><div class="vignette_page"><div contenteditable="true" class="carre editable"></div><div class="page_num"></div></div></article>');
            $container.append( $element );
            //$container.packery( 'addItems', $element )
            $container.packery( 'appended', $element )
            //$container.packery('reloadItems')
            _this.reload();
            
        })
    };


    this.render = function(){
        $container = $('#grid_wrapper');

        //_this.paginate();
        _this.packeryInit();

        $('html').on("click", 'div[contenteditable="true"]', function(e){
            e.currentTarget.focus();
        });

        $(".vignette_page").focusin(function(){
            //$container.packery('destroy');
        });
        $(".vignette_page").focusout(function(){
      
        });

        if($(".vignette").length != 0){
            $(".vignette_page").eq(0).find('.editable').text("Start Here");
        }else{
            //console.log($("input[name=title]"))
            $("input[name=title]").focus();
        }
    };

    this.packeryInit = function(){
        $container.packery({
            columnWidth: 214,
            rowHeight: 170
        });

        $itemElems = $( $container.packery('getItemElements') );
        var slidesElem = document.querySelector('#grid_wrapper');

        $container.packery( 'on', 'layoutComplete', function( pckryInstance, laidOutItems ) {
            console.log("layoutComplete")
        } );

        $container.packery( 'on', 'dragItemPositioned', function( pckryInstance, laidOutItems ) {
            console.log("dragItemPositioned")

            var index = pckryInstance.items.indexOf( laidOutItems );
            var nextItem = pckryInstance.items[ index + 1 ];
            
            if ( nextItem ) {
                slidesElem.insertBefore( laidOutItems.element, nextItem.element );
            } else {
                slidesElem.appendChild( laidOutItems.element );
            }
            _this.paginate();

        } );

        //console.log($itemElems);
        
        $itemElems.draggable({
            start: function(event, ui) {
                $(ui.helper[0]).addClass("on_top");
            },
            drag: function(event, ui) {
      
            },
            stop: function(event, ui) {
                $(ui.helper[0]).removeClass("on_top");
                //_this.paginate();
            }
        });

        $container.packery( 'bindUIDraggableEvents', $itemElems );
        
        _this.paginate();
    };

    this.paginate = function(){
        //console.log("paginate")
        //return;
        var compteur = 1;
        $itemElems = $( $container.packery('getItemElements') );
        
        for ( var i=0; i < $itemElems.length; i++ ) {

            var elem = $itemElems[i];
            var $elem_pages = $(elem).find(".vignette_page");

            for ( var j=0; j < $elem_pages.length; j++ ) {

                var elem_page = $elem_pages[j];
                $(elem_page).find(".page_num").text(compteur)
                compteur++;

            }
        }
    };

    this.reload = function(){
        _this.paginate();
        $('[name="pages"]').val($(".vignette_page").length)

    };

    this.insertAfterClosestPage = function(x,y){
        $itemElems.each(function(idx,el){
            var p = $(this).position()
            var w = $(this).width();
            var h = $(this).height();

            if(p.top < y && (p.top+h) > y){
                if(p.left < x && (p.left+w+20)> x){
                    $(el).after('<div class="vignette_page"><div contenteditable="true" class="carre editable"></div><div class="page_num"></div></div>')
                    $container.packery('reloadItems')
                }
            }
        });
    }


};