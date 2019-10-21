import { errorHandler, assetChecker } from './errorHandler';

// Constructor
function DomHandler(...files) {

    this.loaded = false;
    this.files = files;
    errorHandler(this.files); // Checking initial errors...

    let styleContainer, htmlContainer;

    const createDomElements = (fn) => {
        // console.log('Elements created...')
        styleContainer = document.createElement('style');
        htmlContainer = document.createElement('div');
        if (typeof fn == 'function') fn();
    }
    const fileHandler = () => {
        this.files.forEach(e => {
            const file = e.split('.'),
                fileName = file[0],
                fileType = file[1],
                asset = pc.app.assets.find(fileName, fileType);

            assetChecker(asset);

            if (fileType === 'css') {
                styleContainer.innerHTML += asset.resource;
            } else if (fileType === 'html') {
                htmlContainer.innerHTML += asset.resource;

            }
        });
        // console.log('Dom created!')
    }
    const toggleLoaded = () => this.loaded = !this.loaded;

    this.loadDom = (fn) => {
        if (this.loaded) throw new Error(`${this.files} already loaded`);
        createDomElements(() => fileHandler());

        document.head.appendChild(styleContainer);
        document.body.appendChild(htmlContainer);
        toggleLoaded();
        if (typeof fn == 'function') fn();
    }
    this.removeDom = (fn) => {
        if (!this.loaded) throw new Error(`${this.files} not loaded yet`);
        styleContainer.innerHTML = "";
        htmlContainer.innerHTML = "";
        toggleLoaded();
        if (typeof fn == 'function') fn();
    }
    this.isLoaded = () => this.loaded;

    this.update = () => {
        if (!this.loaded) throw new Error(`${this.files} not loaded yet`);
        this.removeDom(() => {
            this.loadDom();
        });

    }
}

export { DomHandler }
