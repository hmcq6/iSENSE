###   Copyright (c) 2011, iSENSE Project. All rights reserved.

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
###

#Define jQuery
$ = jQuery

#Extend jQuery
$.fn.validateInput = ( options = null ) ->

    #Default settings
    settings =
        initialized : 0
        
    #Overwrite if options aren't empty
    settings = $.extend settings, options
    
    if( settings.initialized == 0 )
    
        settings.validation_form = this
        settings.col_is_numeric = new Array()
        
        settings.headers = settings.validation_form.children().find('.required_header')
        settings.tables = settings.validation_form.children().find('.required_table')
        

        ($ '#type_manual table thead tr td').each (index, element) ->
            settings.col_is_numeric.push( Number(($ ($ element).context).attr('data-type_id')) != 37 and Number(($ ($ element).context).attr('data-type_id')) != 7 )
        
        ($ 'button[type=submit]').click (event) ->
            event.preventDefault()
            console.log settings.headers
            console.log settings.tables
            
    else
    
        console.log this