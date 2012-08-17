// Generated by CoffeeScript 1.3.3

/*
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
 *
*/


(function() {
  var _ref;

  if ((_ref = window.globals) == null) {
    window.globals = {};
  }

  globals.curVis = null;

  /*
  CoffeeScript version of runtime.
  */


  ($(document)).ready(function() {
    var can, containerSize, controlSize, hiderSize, resizeVis, vis, visHeight, visWidth, _i, _len, _ref1;
    _ref1 = ['#map_canvas', '#timeline_canvas', '#scatter_canvas', '#bar_canvas', '#histogram_canvas', '#table_canvas', '#viscanvas', '#motion_canvas'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      can = _ref1[_i];
      ($(can)).hide();
    }
    /* Generate tabs
    */

    for (vis in data.relVis) {
      ($('#visTabList')).append("<li class='vis_tab'><a href='#" + (data.relVis[vis].toLowerCase()) + "_canvas'>" + data.relVis[vis] + "</a></li>");
    }
    /* Jquery up the tabs
    */

    ($('#viscontainer')).tabs();
    ($('#viscontainer')).width(($('#viscontainer')).width() - (($('#viscontainer')).outerWidth() - ($('#viscontainer')).width()));
    globals.curVis = eval('globals.' + data.relVis[0].toLowerCase());
    /* Change vis click handler
    */

    ($('#visTabList a')).click(function() {
      var oldVis, switchVis;
      oldVis = globals.curVis;
      globals.curVis = eval('globals.' + this.innerText.toLowerCase());
      if (oldVis === globals.curVis) {
        return;
      }
      if (oldVis.chart != null) {
        oldVis.chart.showLoading('Loading...');
      }
      /* Give the renderer a cycle to update the loading state before switching
      */

      switchVis = function() {
        globals.curVis.start();
        if (oldVis != null) {
          return oldVis.end();
        }
      };
      return setTimeout(switchVis, 1);
    });
    containerSize = ($('#viscontainer')).width();
    hiderSize = ($('#controlhider')).outerWidth();
    controlSize = 200;
    visWidth = containerSize - (hiderSize + controlSize);
    visHeight = ($('#viscontainer')).height() - ($('#visTabList')).outerHeight();
    ($('.vis_canvas')).width(visWidth);
    ($('.vis_canvas')).height(visHeight);
    ($('#controlhider')).height(visHeight);
    ($('#controldiv')).height(visHeight);
    ($('.vis_canvas')).css('padding', 0);
    globals.curVis.start();
    resizeVis = function() {
      var newWidth;
      containerSize = ($('#viscontainer')).width();
      hiderSize = ($('#controlhider')).outerWidth();
      controlSize = ($('#controldiv')).width() === 0 ? 200 : 0;
      newWidth = containerSize - (hiderSize + controlSize);
      ($('#controldiv')).animate({
        width: controlSize
      }, 600, 'linear');
      ($('.vis_canvas')).animate({
        width: newWidth
      }, 600, 'linear');
      return globals.curVis.resize(newWidth, $('.vis_canvas').height());
    };
    return ($('#control_hide_button')).click(function() {
      return resizeVis();
    });
  });

}).call(this);
