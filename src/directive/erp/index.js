import mouseEnterTrigger from './mouse-enter-trigger'

var directives = [mouseEnterTrigger];

var install = function(){
    directives.forEach(d => d.install())
}


export { install as directiveInstall }