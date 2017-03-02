jQuery(function ($) {
    var fullPath = window.location.search.split("path=")[1] || '/';
    fullPath = window.location.origin + fullPath.replace(/^\/?/, '/');

    $('#filedrawer').on('click', 'a', openUrl);
    loadFiles(fullPath);

    function loadFiles(path) {
        path = fixPath(path);
        $.ajax({
            url: path,
            complete: function (res) {
                $('#filedrawer').html(res.responseText);
                fullPath = path.replace(/\/?$/, '/');
            }
        });
    }

    function fixPath(name) {
        return name.replace(/\/[^\/]*\/\.\.\/$/, '/');
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
            $('audio source').attr('src', url);
            $('audio')[0].load();
        }
    }
});
