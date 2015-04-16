/// <reference path="../../typings/tsd.d.ts" />

import React = require('react');

import Data = require('./example');
import PixelArt = require('../components/tcp-pixel-art');

var _pixelArtProps:PixelArt.PixelArtProps = {
  cellsX:10,
  cellsY:10,
  cells:Data.CellProps
};

React.render(PixelArt.PixelArtFactory(_pixelArtProps), document.body);
