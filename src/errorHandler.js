
export const errorHandler = arr => {
    if (!arr || arr.length < 1) throw 'Domhandler Error : At least one file must be specified';
    if (!pc) throw 'There is no playcanvas Instance';
};

export const assetChecker = asset => {
    if (!asset) throw 'Domhandler Error :File not found';
};