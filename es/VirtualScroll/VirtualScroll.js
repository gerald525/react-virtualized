'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = (function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    _get(Object.getPrototypeOf(VirtualScroll.prototype), 'constructor', this).apply(this, arguments);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(VirtualScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrollTop = this.props.scrollTop;

      if (scrollTop >= 0) {
        this.setScrollTop(scrollTop);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.scrollTop !== this.props.scrollTop) {
        this.setScrollTop(nextProps.scrollTop);
      }
    }

    /**
     * See Grid#recomputeGridSize
     */
  }, {
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }

    /**
     * See Grid#scrollToCell
     */
  }, {
    key: 'scrollToRow',
    value: function scrollToRow(scrollToIndex) {
      this.refs.Grid.scrollToCell({
        scrollToColumn: 0,
        scrollToRow: scrollToIndex
      });
    }

    /**
     * See Grid#setScrollPosition
     */
  }, {
    key: 'setScrollTop',
    value: function setScrollTop(scrollTop) {
      this.refs.Grid.setScrollPosition({
        scrollLeft: 0,
        scrollTop: scrollTop
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var width = _props.width;

      var classNames = (0, _classnames2['default'])('VirtualScroll', className);

      return _react2['default'].createElement(_Grid2['default'], {
        ref: 'Grid',
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function (_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function (_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function (_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        width: width
      });
    }
  }], [{
    key: 'propTypes',
    value: {
      /** Optional CSS class name */
      className: _react.PropTypes.string,

      /** Height constraint for list (determines how many actual rows are rendered) */
      height: _react.PropTypes.number.isRequired,

      /** Optional renderer to be used in place of rows when rowsCount is 0 */
      noRowsRenderer: _react.PropTypes.func.isRequired,

      /**
       * Callback invoked with information about the slice of rows that were just rendered.
       * ({ startIndex, stopIndex }): void
       */
      onRowsRendered: _react.PropTypes.func.isRequired,

      /**
       * Number of rows to render above/below the visible bounds of the list.
       * These rows can help for smoother scrolling on touch devices.
       */
      overscanRowsCount: _react.PropTypes.number.isRequired,

      /**
       * Callback invoked whenever the scroll offset changes within the inner scrollable region.
       * This callback can be used to sync scrolling between lists, tables, or grids.
       * ({ clientHeight, scrollHeight, scrollTop }): void
       */
      onScroll: _react.PropTypes.func.isRequired,

      /**
       * Either a fixed row height (number) or a function that returns the height of a row given its index.
       * (index: number): number
       */
      rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

      /** Responsbile for rendering a row given an index */
      rowRenderer: _react.PropTypes.func.isRequired,

      /** Number of rows in list. */
      rowsCount: _react.PropTypes.number.isRequired,

      /** Row index to ensure visible (by forcefully scrolling if necessary) */
      scrollToIndex: _react.PropTypes.number,

      /** Vertical offset. */
      scrollTop: _react.PropTypes.number,

      /** Width of list */
      width: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      noRowsRenderer: function noRowsRenderer() {
        return null;
      },
      onRowsRendered: function onRowsRendered() {
        return null;
      },
      onScroll: function onScroll() {
        return null;
      },
      overscanRowsCount: 10
    },
    enumerable: true
  }]);

  return VirtualScroll;
})(_react.Component);

exports['default'] = VirtualScroll;
module.exports = exports['default'];