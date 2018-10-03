angular
    .module('snk.components.input')
    .service('TextInsert', function () {
        var textInsert = {
            insert: insert
        }
		
		/*
		  Modo de uso 
		  TextInsert.insert(angular.element('#input1')[0], 'Texto blablabla');
		*/

        function insert(input, text) {
            if (!input) {
                return;
            }

            var scrollPos = input.scrollTop
            var pos = 0

            if (input.selectionStart || input.selectionStart == '0') {
                browser = 'ff';
            } else if (document.selection) {
                browser = 'ie';
            } else {
                browser = false;
            }

            if (browser == 'ie') {
                input.focus()
                range = document.selection.createRange()
                range.moveStart('character', -input.value.length)
                pos = range.text.length

                input.focus()
                range = document.selection.createRange()
                range.moveStart('character', -input.value.length)
                range.moveStart('character', pos)
                range.moveEnd('character', 0)
                range.select()
            } else if (browser == 'ff') {
                pos = input.selectionStart
                front = (input.value).substring(0, pos)
                back = (input.value).substring(pos, input.value.length)
                input.value = front + text + back
                pos = pos + text.length

                input.selectionStart = pos
                input.selectionEnd = pos
                input.focus()
                input.scrollTop = scrollPos
                angular.element(input).trigger('input')
            }
        }

        return textInsert;
    });
