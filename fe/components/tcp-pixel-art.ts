/// <reference path="../../typings/tsd.d.ts" />

import React = require('react');
import _ = require('lodash');
import $= require('jquery');

export interface CellProps {
  id:string;
  backgroundColor:string;
  className?:string;
  cellsX?:number;
  cellsY?:number;
}
export interface CellState {
  backgroundColor:string;
  height:string;
  width:string;
}

export interface PixelArtProps {
  cellsX:number;
  cellsY:number;
  cells:CellProps[];
  height?:number;
  width?:number;
}

export interface PixelArtState {
  height:number;
  width:number;
  cellsX:number;
  cellsY:number;
  cells:CellProps[];
}

var BORDER = 3,
  PERCENTAGE = 0.9;

var getHandW = ():number => {
  var body = document.body,
    html = document.documentElement;

  return Math.min(Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight), Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth));
};

class _Cell extends React.Component<CellProps,CellState> {
  state:CellState = null;

  componentWillMount() {
    var h_w = Math.floor(getHandW() * PERCENTAGE);
    this.setState({
      backgroundColor: this.props.backgroundColor,
      height: Math.floor((h_w / this.props.cellsX) - BORDER) + 'px',
      width: Math.floor((h_w / this.props.cellsY) - BORDER) + 'px'
    })
  }

  onClick() {
    this.setState(
      {
        backgroundColor: this.state.backgroundColor === 'green' ? 'white' : 'green',
        height: this.state.height,
        width: this.state.width
      }
    )
  }

  render() {

    return React.createElement('div', {
      className: "pixel" + (this.props.className ? (' ' + this.props.className) : ''),
      style: {
        backgroundColor: this.state.backgroundColor,
        //height: this.state.height,
        width: this.state.width
      },
      onClick: this.onClick.bind(this)
    });
  }
}

class _PixelArt extends React.Component<PixelArtProps, PixelArtState> {

  state:PixelArtState = null;

  refArray:string[] = [];


  onResize() {
    var h_w = Math.floor(getHandW() * PERCENTAGE);
    _.each(this.refArray, (ref:string)=> {
      var cell = this.refs[ref];
      if (cell) {
        cell.setState({
          height: Math.floor((h_w / this.state.cellsX) - BORDER) + 'px',
          width: Math.floor((h_w / this.state.cellsY) - BORDER) + 'px',
          backgroundColor: cell.state.backgroundColor
        })
      }
    }, this);
    this.setState({
      height: h_w,
      width: h_w,
      cellsX: this.state.cellsX,
      cellsY: this.state.cellsY,
      cells: this.state.cells
    })
  }

  componentDidMount() {
    $(window).on('resize', this.onResize.bind(this));
  }

  componentWillMount() {
    var h_w = getHandW();
    this.setState({
      height: Math.floor(h_w * PERCENTAGE),
      width: Math.floor(h_w * PERCENTAGE),
      cellsX: this.props.cellsX,
      cellsY: this.props.cellsY,
      cells: this.props.cells
    })
  }

  render() {

    var cellRows:any[] = [],
      cells:React.ReactElement<CellProps>[] = [],
      rowH = Math.floor((this.state.height / this.state.cellsY) - BORDER) + 'px',
      rowW = Math.floor((this.state.width / this.state.cellsX - BORDER)) * (this.state.cellsX) + 4 + 'px';

    _.each(this.state.cells, (c:CellProps, i:number) => {
      var cn = '';
      //if we are the any cell but the last one add a right border
      cn += (i % this.state.cellsX) != ((this.state.cellsX - 1) % this.state.cellsX) ? ' pixel-border-right' : '';
      cn += ( Math.floor(i/this.state.cellsX) == (this.state.cellsY - 1)) ? ' pixel-border-bot' : '';
      cells.push(CellFactory({
        key: c.id,
        id: c.id,
        ref: c.id,
        className: cn,
        backgroundColor: c.backgroundColor,
        cellsX: this.state.cellsX,
        cellsY: this.state.cellsY
      }));

      if(!_.contains(this.refArray,c.id)){
        this.refArray.push(c.id);
      }

      if (cells.length == this.state.cellsX) {
        cellRows.push(React.createElement('div',
            {
              className: 'pixel-row',
              key: i + 'pixel-row',
              style: {
                height: rowH,
                width: rowW
              }
            },
            cells
          )
        );
        cells = [];
      }
    }, this);

    return (
      React.createElement('div', {
          className: "pixelArtContainer",
          style: {
            height: this.state.height + 'px',
            width: this.state.width + 'px'
          }
        },
        cellRows
      )
    );
  }
}


export var CellFactory = (props:CellProps)=> {
  return React.createElement(_Cell, props);
};

export var PixelArtFactory = (props:PixelArtProps) => {
  return React.createElement(_PixelArt, props);
};