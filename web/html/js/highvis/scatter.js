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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Scatter = (function(_super) {

    __extends(Scatter, _super);

    /*
        Initialize constants for scatter display mode.
    */


    function Scatter(canvas) {
      this.canvas = canvas;
      this.SYMBOLS_LINES_MODE = 3;
      this.LINES_MODE = 2;
      this.SYMBOLS_MODE = 1;
      this.mode = this.SYMBOLS_LINES_MODE;
      this.xAxis = data.normalFields[0];
      this.advancedTooltips = false;
    }

    /*
        Build up the chart options specific to scatter chart
            The only complex thing here is the html-formatted tooltip.
    */


    Scatter.prototype.buildOptions = function() {
      var self;
      Scatter.__super__.buildOptions.call(this);
      self = this;
      $.extend(true, this.chartOptions, {
        chart: {
          type: "line",
          zoomType: "xy"
        },
        title: {
          text: "Scatter"
        },
        tooltip: {
          formatter: function() {
            var dat, field, fieldIndex, str, _i, _len, _ref;
            if (self.advancedTooltips) {
              str = "<div style='width:100%;text-align:center;color:" + this.series.color + ";'> " + this.series.name.group + "</div><br>";
              str += "<table>";
              _ref = data.fields;
              for (fieldIndex = _i = 0, _len = _ref.length; _i < _len; fieldIndex = ++_i) {
                field = _ref[fieldIndex];
                dat = (Number(field.typeID)) === data.types.TIME ? new Date(this.point.datapoint[fieldIndex]) : this.point.datapoint[fieldIndex];
                str += "<tr><td>" + field.fieldName + "</td>";
                str += "<td><strong>" + dat + "</strong></td></tr>";
              }
              return str += "</table>";
            } else {
              str = "<div style='width:100%;text-align:center;color:" + this.series.color + ";'> " + this.series.name.group + "</div><br>";
              str += "<table>";
              str += "<tr><td>" + this.series.xAxis.options.title.text + ":</td><td><strong>" + this.x + "</strong></td></tr>";
              str += "<tr><td>" + this.series.name.field + ":</td><td><strong>" + this.y + "</strong></td></tr>";
              return str += "</table>";
            }
          },
          useHTML: true
        }
      });
      return this.chartOptions.xAxis = {
        type: 'linear'
      };
    };

    /*
        Build the dummy series for the legend.
    */


    Scatter.prototype.buildLegendSeries = function() {
      var count, field, fieldIndex, options, _i, _len, _ref, _results;
      count = -1;
      _ref = data.fields;
      _results = [];
      for (fieldIndex = _i = 0, _len = _ref.length; _i < _len; fieldIndex = ++_i) {
        field = _ref[fieldIndex];
        if (!(__indexOf.call(data.normalFields, fieldIndex) >= 0)) {
          continue;
        }
        count += 1;
        options = {
          data: [],
          color: '#000',
          visible: __indexOf.call(globals.fieldSelection, fieldIndex) >= 0 ? true : false,
          name: field.fieldName
        };
        switch (false) {
          case this.mode !== this.SYMBOLS_LINES_MODE:
            options.marker = {
              symbol: globals.symbols[count % globals.symbols.length]
            };
            break;
          case this.mode !== this.SYMBOLS_MODE:
            options.marker = {
              symbol: globals.symbols[count % globals.symbols.length]
            };
            options.lineWidth = 0;
            break;
          case this.mode !== this.LINES_MODE:
            options.marker = {
              symbol: 'blank'
            };
            options.dashStyle = globals.dashes[count % globals.dashes.length];
        }
        _results.push(options);
      }
      return _results;
    };

    /*
        Call control drawing methods in order of apperance
    */


    Scatter.prototype.drawControls = function() {
      Scatter.__super__.drawControls.call(this);
      this.drawGroupControls();
      this.drawXAxisControls();
      return this.drawModeControls();
    };

    /*
        Update the chart by removing all current series and recreating them
    */


    Scatter.prototype.update = function() {
      var fieldIndex, group, groupIndex, options, symbolIndex, title, _i, _j, _len, _len1, _ref, _ref1;
      Scatter.__super__.update.call(this);
      title = {
        text: data.fields[this.xAxis].fieldName
      };
      this.chart.xAxis[0].setTitle(title, false);
      _ref = data.normalFields;
      for (symbolIndex = _i = 0, _len = _ref.length; _i < _len; symbolIndex = ++_i) {
        fieldIndex = _ref[symbolIndex];
        if (__indexOf.call(globals.fieldSelection, fieldIndex) >= 0) {
          _ref1 = data.groups;
          for (groupIndex = _j = 0, _len1 = _ref1.length; _j < _len1; groupIndex = ++_j) {
            group = _ref1[groupIndex];
            if (!(__indexOf.call(globals.groupSelection, groupIndex) >= 0)) {
              continue;
            }
            options = {
              data: data.xySelector(this.xAxis, fieldIndex, groupIndex),
              showInLegend: false,
              color: globals.colors[groupIndex % globals.colors.length],
              name: {
                group: data.groups[groupIndex],
                field: data.fields[fieldIndex].fieldName
              }
            };
            switch (false) {
              case this.mode !== this.SYMBOLS_LINES_MODE:
                options.marker = {
                  symbol: globals.symbols[symbolIndex % globals.symbols.length]
                };
                break;
              case this.mode !== this.SYMBOLS_MODE:
                options.marker = {
                  symbol: globals.symbols[symbolIndex % globals.symbols.length]
                };
                options.lineWidth = 0;
                break;
              case this.mode !== this.LINES_MODE:
                options.marker = {
                  symbol: 'blank'
                };
                options.dashStyle = globals.dashes[symbolIndex % globals.dashes.length];
            }
            this.chart.addSeries(options, false);
          }
        }
      }
      return this.chart.redraw();
    };

    /*
        Draws radio buttons for changing symbol/line mode.
    */


    Scatter.prototype.drawModeControls = function() {
      var controls, mode, modeText, _i, _len, _ref, _ref1, _ref2,
        _this = this;
      controls = '<div id="scatterModeControl" class="vis_controls">';
      controls += "<h3 class='clean_shrink'><a href='#'>Tools:</a></h3>";
      controls += "<div class='outer_control_div'>";
      controls += "<h6 class='clean_shrink'>Display Mode</h6>";
      _ref = [[this.SYMBOLS_LINES_MODE, "Symbols and Lines"], [this.LINES_MODE, "Lines Only"], [this.SYMBOLS_MODE, "Symbols Only"]];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], mode = _ref1[0], modeText = _ref1[1];
        controls += '<div class="inner_control_div">';
        controls += "<input class='mode_radio' type='radio' name='mode_selector' value='" + mode + "' " + (this.mode === mode ? 'checked' : '') + "/>";
        controls += modeText + "</div>";
      }
      controls += "<br>";
      controls += "<h6 class='clean_shrink'>Other</h6>";
      controls += '<div class="inner_control_div">';
      controls += "<input class='tooltip_box' type='checkbox' name='tooltip_selector' " + (this.advancedTooltips ? 'checked' : '') + "/> Advanced Tooltips ";
      controls += "</div></div></div>";
      ($('#controldiv')).append(controls);
      ($('.mode_radio')).click(function(e) {
        _this.mode = Number(e.target.value);
        return _this.delayedUpdate();
      });
      ($('.tooltip_box')).click(function(e) {
        _this.advancedTooltips = !_this.advancedTooltips;
        return console.log(_this.advancedTooltips);
      });
      if ((_ref2 = globals.scatterToolsOpen) == null) {
        globals.scatterToolsOpen = 0;
      }
      ($('#scatterModeControl')).accordion({
        collapsible: true,
        active: globals.scatterToolsOpen
      });
      return ($('#scatterModeControl > h3')).click(function() {
        return globals.scatterToolsOpen = (globals.scatterToolsOpen + 1) % 2;
      });
    };

    /*
        Draws x axis selection controls
            This includes a series of radio buttons.
    */


    Scatter.prototype.drawXAxisControls = function(filter) {
      var controls, field, fieldIndex, possible, _i, _len, _ref, _ref1,
        _this = this;
      if (filter == null) {
        filter = function(fieldIndex) {
          return __indexOf.call(data.normalFields, fieldIndex) >= 0;
        };
      }
      possible = (function() {
        var _i, _len, _ref, _results;
        _ref = data.fields;
        _results = [];
        for (fieldIndex = _i = 0, _len = _ref.length; _i < _len; fieldIndex = ++_i) {
          field = _ref[fieldIndex];
          if (filter(fieldIndex)) {
            _results.push(true);
          }
        }
        return _results;
      })();
      if (possible.length <= 1) {
        return;
      }
      controls = '<div id="xAxisControl" class="vis_controls">';
      controls += "<h3 class='clean_shrink'><a href='#'>X Axis:</a></h3>";
      controls += "<div class='outer_control_div'>";
      _ref = data.fields;
      for (fieldIndex = _i = 0, _len = _ref.length; _i < _len; fieldIndex = ++_i) {
        field = _ref[fieldIndex];
        if (!(filter(fieldIndex))) {
          continue;
        }
        controls += '<div class="inner_control_div">';
        controls += "<input class=\"xAxis_input\" type=\"radio\" name=\"xaxis\" value=\"" + fieldIndex + "\" " + ((Number(fieldIndex)) === this.xAxis ? "checked" : "") + "></input>&nbsp";
        controls += "" + data.fields[fieldIndex].fieldName + "&nbsp";
        controls += "</div>";
      }
      controls += '</div></div>';
      ($('#controldiv')).append(controls);
      ($('.xAxis_input')).click(function(e) {
        var selection;
        selection = null;
        ($('.xAxis_input')).each(function() {
          if (this.checked) {
            return selection = this.value;
          }
        });
        _this.xAxis = Number(selection);
        return _this.delayedUpdate();
      });
      if ((_ref1 = globals.xAxisOpen) == null) {
        globals.xAxisOpen = 0;
      }
      ($('#xAxisControl')).accordion({
        collapsible: true,
        active: globals.xAxisOpen
      });
      return ($('#xAxisControl > h3')).click(function() {
        return globals.xAxisOpen = (globals.xAxisOpen + 1) % 2;
      });
    };

    return Scatter;

  })(BaseHighVis);

  globals.scatter = new Scatter('scatter_canvas');

}).call(this);
