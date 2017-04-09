if (window.top != window) {
    document.documentElement.className += ' embedded';

    function receiveMessage(event) {
        var origin = event.origin;
        var action = event.data.action;
        var payload = event.data.payload || {};

        if (payload.host && payload.host.indexOf(origin) === 0) {
            if (action === 'updateVars') {
                updateVars(payload);
            }
        }
    }

    function updateVars(payload) {
        var codes = document.querySelectorAll('code');

        codes.forEach(function(code) {
            code.innerHTML = replaceVars(code.innerHTML, payload);
        });
    }

    function replaceVars(html, vars) {
        Object.keys(vars).forEach(function(key) {
            var val = vars[key];
            var pattern = '\\$\\{' + key + '\\}';

            html = html.replace(new RegExp(pattern, 'g'), val);
        });

        return html;
    }

    window.addEventListener('message', receiveMessage, false);
}
