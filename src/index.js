import { errorHandler, assetChecker } from './errorHandler';

let styleContainer, htmlContainer, gAssets = [];

function DomHandler(...files) {
    this.loaded = false;
    this.autoUpdate = true;
    this.files = files;
    errorHandler(this.files); // Checking initial errors...

    this.files.forEach(e => fileSplitter(e)) // Initial asset actions
    this._addUpdateEventToElements();
}


var fileSplitter = fName => {
    const file = fName.split('.'),
        fileName = file[0],
        fileType = file[1],
        asset = pc.app.assets.find(fileName, fileType);
    assetChecker(asset); // Checking asset errors...
    gAssets.push(asset)

    return true
}

var createDomElements = function (fn) {
    styleContainer = document.createElement('style');
    htmlContainer = document.createElement('div');
    if (typeof fn == 'function') fn(); // For callback
}

DomHandler.prototype = {

    _toggleLoaded: function () { return this.loaded = !this.loaded },

    loadDom: function (fn) {

        if (this.loaded) throw new Error(`${this.files} already loaded`);

        createDomElements(() => {
            gAssets.forEach(el => {
                if (el.type == 'css') {
                    styleContainer.innerHTML += el.resource;
                } else if (el.type == 'html') {
                    htmlContainer.innerHTML += el.resource;
                }
            })

            document.head.appendChild(styleContainer);
            document.body.appendChild(htmlContainer);
            this._toggleLoaded();
        });

        if (typeof fn == 'function') fn(); // For callback
    },
    removeDom: function (fn) {
        if (!this.loaded) throw new Error(`${this.files} not loaded yet`);

        styleContainer.remove();
        htmlContainer.remove();
        this._toggleLoaded();

        if (typeof fn == 'function') fn(); // For callback

    },
    toggleAutoUpdate: function () {
        this.autoUpdate = !this.autoUpdate;
        var self = this;
        if (this.autoUpdate) {
            gAssets.forEach(function (e) {
                e.on('change', function () {
                    if (!self.loaded) return;
                    self.removeDom(() => {
                        self.loadDom();
                    });

                })
            })
        } else {
            gAssets.forEach(e => {
                e.off('change');
            })
        }
    },
    _addUpdateEventToElements: function () {
        var self = this;
        gAssets.forEach(e => {

            e.on('change', function () {
                if (!self.loaded) return;
                self.removeDom(() => {
                    self.loadDom();
                });

            })
        })

    }

}

export { DomHandler }
