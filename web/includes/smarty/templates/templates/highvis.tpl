<!--
 * Copyright (c) 2011, iSENSE Project. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials
 * provided with the distribution. Neither the name of the University of
 * Massachusetts Lowell nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 -->


</div>
<div id="viscontainer">

    <ul id='visTabList'>
    </ul>


    <div id="map_canvas" class="vis_canvas"></div>
    <div id="table_canvas" class="vis_canvas"></div>
    <div id="timeline_canvas" class="vis_canvas"></div>
    <div id="scatter_canvas" class="vis_canvas"></div>
    <div id="bar_canvas" class="vis_canvas"></div>
    <div id="histogram_canvas" class="vis_canvas"></div>
    <div id="motion_canvas" class="vis_canvas"></div>
    <div id="photos_canvas" class="vis_canvas"></div>
    
    <div id='controlhider'>
        <button id="control_hide_button" type="button" style="margin:5px;"> > </button>
    </div>
    <div id="controldiv"></div>
</div>

<script>
    {literal} 
        $('#container,#viscontainer,#content').css("width", window.innerWidth-100);
        $('#pagetitle').css("border-bottom","0px");

        $(window).resize(function() {      
            $('#container,#viscontainer,#content').css("width", window.innerWidth-100);
        });
    {/literal}
</script>