jQuery(function ($) {
    var fullPath = window.location.search.split("path=")[1] || '/';
    fullPath = window.location.origin + fullPath.replace(/^\//, '/');

    $('#filedrawer').on('click', 'a', openUrl);
    loadFiles(fullPath);

    function loadFiles(path) {
        // path = fixPath(path);
        $.ajax({
            path: path,
            complete: function (res) {
                var list = res.responseText.match(/href="([^"]*)"/g),
                    ul = $('<ul>');

                list.forEach(function (name) {
                    name = name.replace(/^href="/, '').replace(/"$/, '');
                    if (name) {
                        ul.append(createLi(name));
                    }
                });

                fullPath = path.replace(/\/$/, '/');
                $('#filedrawer').empty().append(ul);
            }
        });
    }

    function fixPath(name) {
        return name.replace(/\/[^\/]*\/\.\.\//g, '/');
    }

    function createLi(name) {
        var li = $('<li>'),
            link = $('<a>');
        link.attr('href', name);
        link.text(name.replace(/^.*\/[^.]/, ''));
        li.append(link);
        return li;
    }

    function openUrl(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        if (!/^(https?:\/\/|\/)/.test(url)) {
            url = fullPath + url;
        }
        if (/\/$/.test(url)) {
            loadFiles(url);
        } else {
            $('#url').val(url);
            $('#modal_play').click();
        }
    }
});
