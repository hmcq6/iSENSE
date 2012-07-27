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

$(document).ready ->

    ($ '#upload_form').validateInput()

    ###
    col_is_numeric = new Array()

    ($ '#type_manual table thead tr td').each (index, element) ->
        col_is_numeric.push( Number(($ ($ element).context).attr('data-type_id')) != 37 and Number(($ ($ element).context).attr('data-type_id')) != 7 )
    
    $('#ses_create').click (event) ->
    
        validated = {}
        rowError = new Array()
        
        #Prepare DOM
        event.preventDefault()
        ($ '#blank_rows').empty()
        ($ '#mismatch_rows').empty()
                        
        if($ '#session_name')
            validated.name = ($ '#session_name').val() != ''
        if($ '#session_description')
            validated.description = ($ '#session_description').val() != ''
        if($ '#session_citystate')
            validated.citystate = ($ '#session_citystate').val() != ''
                    
        ($ '#type_manual table tbody tr:not(#template)').each (row_index, element) ->
            validated.row_blank = true
            validated.row_mismatch = false
            
            ($ element).children().each (col_index, subelement) ->
                validated.row_blank = validated.row_blank && ($ subelement).find('input').val() == ""
                if( col_is_numeric[col_index] == true )
                    validated.row_mismatch = validated.row_mismatch || (isNaN ($ subelement).find('input').val())
                
            if(validated.row_blank == true)
                rowError[row_index] = 'Blank Row'
            else if(validated.row_mismatch == true)
                rowError[row_index] = 'Mismatch Row'
            else
                rowError[row_index] = 'Ok!'
                    
        if(validated.name == false)
            ($ '#session_name').css 'background-color', '#FF3333'
        else
            ($ '#session_name').css 'background-color', '#00FF33'
        
        if(validated.description == false)
            ($ '#session_description').css 'background-color', '#FF3333'
        else
            ($ '#session_description').css 'background-color', '#00FF33'
                
        if(validated.citystate == false)
            ($ '#session_citystate').css 'background-color', '#FF3333'
        else
            ($ '#session_citystate').css 'background-color', '#00FF33'
                    
        ($ '#type_manual table tbody tr:not(#template)').each (row_index, element) ->
            if(rowError[row_index] == "Ok!")
                ($ element).children().children().css 'background-color', '#00FF33'
                #($ '#type_manual table').append('<div id="errors"></div>')
                #console.log ($ element).offset().top
            else
                ($ element).children().children().css 'background-color', '#FF3333'
                if(rowError[row_index] == "Blank Row")
                    ($ '#blank_rows').append(' ' + (row_index+1))
                else if( rowError[row_index] == "Mismatch Row")
                    ($ '#mismatch_rows').append(' ' + (row_index+1))
                    
        if(validated.name == false)
            ($ '#empty_name').show()


        if(validated.description == false)
            ($ '#empty_description').show()


        if(validated.citystate == false)
            ($ '#empty_citystate').show()

                    
        if(($ '#blank_rows').text() == "")
            ($ '#blank_rows').parent().hide()
        else
            ($ '#blank_rows').parent().show()
            
            
        if( ($ '#mismatch_rows').text() == "" )
            ($ '#mismatch_rows').parent().hide()
        else
            ($ '#mismatch_rows').parent().show()
            
        console.log(validated)
        
                    
        #event.submit
        ###
        
