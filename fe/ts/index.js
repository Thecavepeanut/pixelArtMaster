var React = require('react');
var Data = require('./example');
var PixelArt = require('../components/tcp-pixel-art');
var _pixelArtProps = {
    cellsX: 10,
    cellsY: 10,
    cells: Data.CellProps
};
React.render(PixelArt.PixelArtFactory(_pixelArtProps), document.body);
//# sourceMappingURL=index.js.map