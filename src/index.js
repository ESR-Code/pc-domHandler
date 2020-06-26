import { errorHandler, assetChecker } from './errorHandler';


const DomHandler = function (...files) {
    this.loaded = false;
    this.autoUpdate = true;
    this.files = files;
    this.gAssets = [];
    this.domElements = [];
    errorHandler(this.files); // Checking initial errors...

    var fileSplitter = fName => {
        const file = fName.split('.'),
            fileName = file[0],
            fileType = file[1],
            asset = pc.app.assets.find(fileName, fileType);
        assetChecker(asset); // Checking asset errors...
        this.gAssets.push(asset)

        return true
    }

    this.files.forEach(e => fileSplitter(e)) // Initial asset actions
    this._addUpdateEventToElements();
}



DomHandler.prototype = {

    _toggleLoaded: function () { return this.loaded = !this.loaded },

    loadDom: function (fn) {

        if (this.loaded) throw new Error(`${this.files} already loaded`);

        this.gAssets.forEach(el => {
            let container;
            if (el.type == 'css') {
                container = document.createElement('style');
                container.innerHTML += el.resource;
                document.head.appendChild(container);

            } else if (el.type == 'html') {
                container = document.createElement('div');
                container.innerHTML += el.resource;
                document.body.appendChild(container);

            }
            this.domElements.push({ domElement: container, name: el.name })
        })

        this._toggleLoaded();
        if (typeof fn == 'function') fn(); // For callback
    },
    removeDom: function (fn) {

        if (!this.loaded) throw new Error(`${this.files} not loaded yet`);
        this.domElements.forEach(e => e.domElement.remove())
        this._toggleLoaded();
        if (typeof fn == 'function') fn(); // For callback

    },
    toggleAutoUpdate: function () {
        this.autoUpdate = !this.autoUpdate;
        var self = this;
        if (this.autoUpdate) {
            this.gAssets.forEach(function (e) {
                e.on('change', function () {
                    if (!self.loaded) return;
                    self.removeDom(() => {
                        self.loadDom();
                    });

                })
            })
        } else {
            this.gAssets.forEach(e => {
                e.off('change');
            })
        }
    },
    _addUpdateEventToElements: function () {
        var self = this;
        this.gAssets.forEach(e => {
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
