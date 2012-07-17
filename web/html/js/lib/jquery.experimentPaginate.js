/*   Copyright (c) 2011, iSENSE Project. All rights reserved.

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
*/

var $;

$ = jQuery;

$.fn.experimentPaginate = function(options) {
  var end, page_controls, settings, update;
  if (options == null) options = null;
  settings = {
    start: 0,
    limit: 20
  };
  settings = $.extend(settings, options);
  if ((settings.start + settings.limit) > $('#session_list').children().length) {
    end = $('#session_list').children().length;
  } else {
    end = settings.start + settings.limit;
  }
  page_controls = "<div id='page_controls'>\n    <div id='page_info'>\n        <p>Displaying Session #" + settings.start + " to Session #" + end + "</p>\n    </div>\n</div>";
  update = function(target, settings) {
    if ($('#page_controls')) $('#page_controls').remove();
    $(target).parent().append(page_controls);
    ($(window)).scroll(function() {
      if (((($(window)).scrollTop() + ($(window)).innerHeight()) > ($('#page_info')).offset().top) === true) {
        ($(window)).unbind();
        return $('#session_list').experimentPaginate({
          start: settings.start,
          limit: settings.limit + 20
        });
      }
    });
    return $(target).children().each(function(index) {
      $(this).hide();
      if (index >= settings.start && index < (settings.start + settings.limit)) {
        return $(this).show();
      }
    });
  };
  return this.each(function() {
    return update(this, settings);
  });
};
