(function () {
    document.querySelector('.wrap').addEventListener('click', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() === 'a' && target.classList.contains('view-source-target')) {
            var source = target.parentNode.nextElementSibling;
            if(source){
                var display = 'block';
                if(source.style.display && source.style.display === 'block'){
                    display = 'none';
                }
                source.style.display = display;
            }
        }
    }, false)
})()    