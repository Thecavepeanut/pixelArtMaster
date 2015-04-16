var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react');
var _ = require('lodash');
var $ = require('jquery');
var BORDER = 3, PERCENTAGE = 0.9;
var getHandW = function () {
    var body = document.body, html = document.documentElement;
    return Math.min(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight), Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth));
};
var _Cell = (function (_super) {
    __extends(_Cell, _super);
    function _Cell() {
        _super.apply(this, arguments);
        this.state = null;
    }
    _Cell.prototype.componentWillMount = function () {
        var h_w = Math.floor(getHandW() * PERCENTAGE);
        this.setState({
            backgroundColor: this.props.backgroundColor,
            height: Math.floor((h_w / this.props.cellsX) - BORDER) + 'px',
            width: Math.floor((h_w / this.props.cellsY) - BORDER) + 'px'
        });
    };
    _Cell.prototype.onClick = function () {
        this.setState({
            backgroundColor: this.state.backgroundColor === 'green' ? 'white' : 'green',
            height: this.state.height,
            width: this.state.width
        });
    };
    _Cell.prototype.render = function () {
        return React.createElement('div', {
            className: "pixel" + (this.props.className ? (' ' + this.props.className) : ''),
            style: {
                backgroundColor: this.state.backgroundColor,
                width: this.state.width
            },
            onClick: this.onClick.bind(this)
        });
    };
    return _Cell;
})(React.Component);
var _PixelArt = (function (_super) {
    __extends(_PixelArt, _super);
    function _PixelArt() {
        _super.apply(this, arguments);
        this.state = null;
        this.refArray = [];
    }
    _PixelArt.prototype.onResize = function () {
        var _this = this;
        var h_w = Math.floor(getHandW() * PERCENTAGE);
        _.each(this.refArray, function (ref) {
            var cell = _this.refs[ref];
            if (cell) {
                cell.setState({
                    height: Math.floor((h_w / _this.state.cellsX) - BORDER) + 'px',
                    width: Math.floor((h_w / _this.state.cellsY) - BORDER) + 'px',
                    backgroundColor: cell.state.backgroundColor
                });
            }
        }, this);
        this.setState({
            height: h_w,
            width: h_w,
            cellsX: this.state.cellsX,
            cellsY: this.state.cellsY,
            cells: this.state.cells
        });
    };
    _PixelArt.prototype.componentDidMount = function () {
        $(window).on('resize', this.onResize.bind(this));
    };
    _PixelArt.prototype.componentWillMount = function () {
        var h_w = getHandW();
        this.setState({
            height: Math.floor(h_w * PERCENTAGE),
            width: Math.floor(h_w * PERCENTAGE),
            cellsX: this.props.cellsX,
            cellsY: this.props.cellsY,
            cells: this.props.cells
        });
    };
    _PixelArt.prototype.render = function () {
        var _this = this;
        var cellRows = [], cells = [], rowH = Math.floor((this.state.height / this.state.cellsY) - BORDER) + 'px', rowW = Math.floor((this.state.width / this.state.cellsX - BORDER)) * (this.state.cellsX) + 4 + 'px';
        _.each(this.state.cells, function (c, i) {
            var cn = '';
            cn += (i % _this.state.cellsX) != ((_this.state.cellsX - 1) % _this.state.cellsX) ? ' pixel-border-right' : '';
            cn += (Math.floor(i / _this.state.cellsX) == (_this.state.cellsY - 1)) ? ' pixel-border-bot' : '';
            cells.push(exports.CellFactory({
                key: c.id,
                id: c.id,
                ref: c.id,
                className: cn,
                backgroundColor: c.backgroundColor,
                cellsX: _this.state.cellsX,
                cellsY: _this.state.cellsY
            }));
            if (!_.contains(_this.refArray, c.id)) {
                _this.refArray.push(c.id);
            }
            if (cells.length == _this.state.cellsX) {
                cellRows.push(React.createElement('div', {
                    className: 'pixel-row',
                    key: i + 'pixel-row',
                    style: {
                        height: rowH,
                        width: rowW
                    }
                }, cells));
                cells = [];
            }
        }, this);
        return (React.createElement('div', {
            className: "pixelArtContainer",
            style: {
                height: this.state.height + 'px',
                width: this.state.width + 'px'
            }
        }, cellRows));
    };
    return _PixelArt;
})(React.Component);
exports.CellFactory = function (props) {
    return React.createElement(_Cell, props);
};
exports.PixelArtFactory = function (props) {
    return React.createElement(_PixelArt, props);
};
//# sourceMappingURL=tcp-pixel-art.js.map