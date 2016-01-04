import React from 'react'
import { findDOMNode, render } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import TestUtils from 'react-addons-test-utils'
import Immutable from 'immutable'
import FlexColumn from './FlexColumn'
import FlexTable, { SortDirection } from './FlexTable'
import styles from './FlexTable.css'

// Helper functions to convert className style selectors to css-module friendly selector.
function findAll (element, expression) {
  var parts = expression.replace('.', '').split(':')
  var className = styles[parts.shift()]
  var modifier = parts.length ? `:${parts.shift()}` : ''
  return element.querySelectorAll(`.${className}${modifier}`)
}
function find (element, expression) {
  const matches = findAll(element, expression)
  return matches.length ? matches[0] : null
}

describe('FlexTable', () => {
  beforeAll(() => jasmine.clock().install())
  afterAll(() => jasmine.clock().uninstall())

  // Used by the renderOrUpdateTable() helper method
  var node = null
  beforeEach(() => {
    node = document.createElement('div')
  })

  const array = []
  for (var i = 0; i < 100; i++) {
    array.push({
      id: i,
      name: `Name ${i}`,
      email: `user-${i}@treasure-data.com`
    })
  }
  const list = Immutable.fromJS(array)

  // Works with an Immutable List of Maps
  function immutableRowGetter (index) {
    return list.get(index)
  }

  // Works with an Array of Objects
  function vanillaRowGetter (index) {
    return array[index]
  }

  function getMarkup ({
    cellRenderer = undefined,
    cellDataGetter = undefined,
    disableSort = false,
    headerHeight = 20,
    height = 100,
    noRowsRenderer = undefined,
    onRowClick = undefined,
    onRowsRendered = undefined,
    rowGetter = immutableRowGetter,
    rowHeight = 10,
    rowsCount = list.size,
    rowClassName = undefined,
    scrollToIndex = undefined,
    sort = undefined,
    sortBy = undefined,
    sortDirection = undefined,
    width = 100
  } = {}) {
    return (
      <FlexTable
        width={width}
        headerHeight={headerHeight}
        height={height}
        noRowsRenderer={noRowsRenderer}
        onRowClick={onRowClick}
        onRowsRendered={onRowsRendered}
        rowGetter={rowGetter}
        rowHeight={rowHeight}
        rowsCount={rowsCount}
        rowClassName={rowClassName}
        sort={sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      >
        <FlexColumn
          label='Name'
          dataKey='name'
          width={50}
          cellRenderer={cellRenderer}
          cellDataGetter={cellDataGetter}
          disableSort={disableSort}
        />
        <FlexColumn
          label='Email'
          dataKey='email'
          width={50}
        />
      </FlexTable>
    )
  }

  function renderTable (props) {
    const flexTable = TestUtils.renderIntoDocument(getMarkup(props))

    // Allow initial setImmediate() to set :scrollTop
    jasmine.clock().tick()

    return flexTable
  }

  // Use ReactDOM.render for certain tests so that props changes will update the existing component
  // TestUtils.renderIntoDocument creates a new component/instance each time
  function renderOrUpdateTable (props) {
    let flexTable = render(getMarkup(props), node)

    // Allow initial setImmediate() to set :scrollTop
    jasmine.clock().tick()

    return findDOMNode(flexTable)
  }

  // Maybe test FlexTable.propTypes.children directly
  it('should not accept non-FlexColumn children', () => {
    const result = FlexTable.propTypes.children({ children: <div/> }, 'children', 'FlexTable')
    expect(result instanceof Error).toEqual(true)
  })

  describe('initial rendering', () => {
    // Ensure that both Immutable Lists of Maps and Arrays of Objects are supported
    const useImmutable = [true, false]
    useImmutable.forEach(useImmutable => {
      it('should render the correct number of rows', () => {
        const table = renderTable({
          rowGetter: useImmutable ? immutableRowGetter : vanillaRowGetter
        })
        const tableDOMNode = findDOMNode(table)

        // 100px height should fit 1 header (20px) and 8 rows (10px each) -
        expect(findAll(tableDOMNode, '.headerRow').length).toEqual(1)
        expect(findAll(tableDOMNode, '.row').length).toEqual(8)
      })

      it('should render the expected headers', () => {
        const table = renderTable({
          rowGetter: useImmutable ? immutableRowGetter : vanillaRowGetter
        })
        const tableDOMNode = findDOMNode(table)
        const columns = findAll(tableDOMNode, '.headerColumn')

        expect(columns.length).toEqual(2)
        expect(columns[0].textContent).toEqual('Name')
        expect(columns[1].textContent).toEqual('Email')
      })

      it('should render the expected rows and columns', () => {
        const table = renderTable({
          rowGetter: useImmutable ? immutableRowGetter : vanillaRowGetter,
          headerHeight: 10,
          rowHeight: 20,
          height: 50
        })
        const tableDOMNode = findDOMNode(table)
        const rows = findAll(tableDOMNode, '.row')
        expect(rows.length).toEqual(2)

        for (let index = 0; index < rows.length; index++) {
          let row = rows[index]
          let rowData = list.get(index)
          let columns = findAll(row, '.rowColumn')
          expect(columns.length).toEqual(2)
          expect(columns[0].textContent).toEqual(rowData.get('name'))
          expect(columns[1].textContent).toEqual(rowData.get('email'))
        }
      })
    })
  })

  describe('custom getter functions', () => {
    it('should use a custom cellDataGetter if specified', () => {
      const table = renderTable({
        cellDataGetter: (dataKey, rowData, columnData) => `Custom ${dataKey} for row ${rowData.get('id')}`
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumns = findAll(tableDOMNode, '.rowColumn:first-of-type')

      for (let index = 0; index < nameColumns.length; index++) {
        let nameColumn = nameColumns[index]
        expect(nameColumn.textContent).toEqual(`Custom name for row ${index}`)
      }
    })

    it('should use a custom cellRenderer if specified', () => {
      const table = renderTable({
        cellRenderer: (cellData, dataKey, rowData, rowIndex, columnData) => `Custom ${cellData}`
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumns = findAll(tableDOMNode, '.rowColumn:first-of-type')

      for (let index = 0; index < nameColumns.length; index++) {
        let nameColumn = nameColumns[index]
        let rowData = list.get(index)
        expect(nameColumn.textContent).toEqual(`Custom ${rowData.get('name')}`)
      }
    })

    it('should set the rendered cell content as the cell :title if it is a string', () => {
      const table = renderTable({
        cellRenderer: (cellData, dataKey, rowData, rowIndex, columnData) => 'Custom'
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumn = find(tableDOMNode, '.rowColumn:first-of-type')
      expect(nameColumn.children[0].getAttribute('title')).toContain('Custom')
    })

    it('should not set a cell :title if the rendered cell content is not a string', () => {
      const table = renderTable({
        cellRenderer: (cellData, dataKey, rowData, rowIndex, columnData) => <div>Custom</div>
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumn = find(tableDOMNode, '.rowColumn:first-of-type')
      expect(nameColumn.children[0].getAttribute('title')).toEqual(null)
    })
  })

  describe('sorting', () => {
    it('should not render sort indicators if no sort function is provided', () => {
      const table = renderTable()
      const tableDOMNode = findDOMNode(table)
      const nameColumn = findAll(tableDOMNode, '.headerColumn:first-of-type')

      expect(nameColumn.className).not.toContain(styles.sortableHeaderColumn)
    })

    it('should not render sort indicators for non-sortable columns', () => {
      const table = renderTable({
        disableSort: true,
        sort: () => {}
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumn = findAll(tableDOMNode, '.headerColumn:first-of-type')

      expect(nameColumn.className).not.toContain(styles.sortableHeaderColumn)
      expect(findAll(tableDOMNode, '.sortableHeaderColumn').length).toEqual(1) // Email only
    })

    it('should render sortable column headers as sortable', () => {
      const table = renderTable({
        sort: () => {}
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumn = find(tableDOMNode, '.headerColumn:first-of-type')

      expect(nameColumn.className).toContain(styles.sortableHeaderColumn)
      expect(findAll(tableDOMNode, '.sortableHeaderColumn').length).toEqual(2) // Email and Name
    })

    it('should render the correct sort indicator by the current sort-by column', () => {
      const sortDirections = [SortDirection.ASC, SortDirection.DESC]
      sortDirections.forEach(sortDirection => {
        const table = renderTable({
          sort: () => {},
          sortBy: 'name',
          sortDirection
        })
        const tableDOMNode = findDOMNode(table)
        const nameColumn = find(tableDOMNode, '.headerColumn:first-of-type')

        expect(find(nameColumn, '.sortableHeaderIcon')).not.toEqual(null)
        expect(nameColumn.querySelector(`[data-sort-direction=${sortDirection}]`)).not.toEqual(null)
      })
    })

    it('should call sort with the correct arguments when the current sort-by column header is clicked', () => {
      const sortDirections = [SortDirection.ASC, SortDirection.DESC]
      sortDirections.forEach(sortDirection => {
        const sortCalls = []
        const table = renderTable({
          sort: (dataKey, newSortDirection) => sortCalls.push({dataKey, newSortDirection}),
          sortBy: 'name',
          sortDirection
        })
        const tableDOMNode = findDOMNode(table)
        const nameColumn = find(tableDOMNode, '.headerColumn:first-of-type')

        Simulate.click(nameColumn)
        expect(sortCalls.length).toEqual(1)

        const {dataKey, newSortDirection} = sortCalls[0]
        const expectedSortDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
        expect(dataKey).toEqual('name')
        expect(newSortDirection).toEqual(expectedSortDirection)
      })
    })

    it('should call sort with the correct arguments when a new sort-by column header is clicked', () => {
      const sortCalls = []
      const table = renderTable({
        sort: (dataKey, newSortDirection) => sortCalls.push({dataKey, newSortDirection}),
        sortBy: 'email',
        sortDirection: SortDirection.ASC
      })
      const tableDOMNode = findDOMNode(table)
      const nameColumn = find(tableDOMNode, '.headerColumn:first-of-type')

      Simulate.click(nameColumn)
      expect(sortCalls.length).toEqual(1)

      const {dataKey, newSortDirection} = sortCalls[0]
      expect(dataKey).toEqual('name')
      expect(newSortDirection).toEqual(SortDirection.ASC)
    })
  })

  describe('noRowsRenderer', () => {
    it('should call :noRowsRenderer if :rowsCount is 0', () => {
      const table = renderTable({
        noRowsRenderer: () => <div>No rows!</div>,
        rowsCount: 0
      })
      const bodyDOMNode = findDOMNode(table.refs.VirtualScroll)
      expect(bodyDOMNode.textContent).toEqual('No rows!')
    })

    it('should render an empty body if :rowsCount is 0 and there is no :noRowsRenderer', () => {
      const table = renderTable({
        rowsCount: 0
      })
      const bodyDOMNode = findDOMNode(table.refs.VirtualScroll)
      expect(bodyDOMNode.textContent).toEqual('')
    })
  })

  describe('onRowClick', () => {
    it('should call :onRowClick with the correct :rowIndex when a row is clicked', () => {
      const onRowClickCalls = []
      const table = renderTable({
        onRowClick: index => onRowClickCalls.push(index)
      })
      const tableDOMNode = findDOMNode(table)
      const rows = findAll(tableDOMNode, '.row')
      Simulate.click(rows[0])
      Simulate.click(rows[3])
      expect(onRowClickCalls).toEqual([0, 3])
    })
  })
  describe('rowClassName', () => {
    it('should render a static classname given :rowClassName as a string', () => {
      const staticClassName = 'staticClass'
      const table = renderTable({
        rowClassName: staticClassName
      })
      const tableDOMNode = findDOMNode(table)
      const rows = findAll(tableDOMNode, '.row')
      for (let index = 0; index < rows.length; index++) {
        let row = rows[index]
        expect(row.className).toContain(staticClassName)
      }
    })

    it('should render dynamic classname given :rowClassName as a function', () => {
      const table = renderTable({
        rowClassName: rowIndex => rowIndex % 2 === 0 ? 'even' : 'odd'
      })
      const tableDOMNode = findDOMNode(table)
      const rows = findAll(tableDOMNode, '.row')
      for (let index = 0; index < rows.length; index++) {
        let row = rows[index]
        if (index % 2 === 0) {
          expect(row.className).toContain('even')
          expect(row.className).not.toContain('odd')
        } else {
          expect(row.className).toContain('odd')
          expect(row.className).not.toContain('even')
        }
      }
    })
  })

  describe('onRowsRendered', () => {
    it('should call :onRowsRendered at least one row is rendered', () => {
      let startIndex, stopIndex
      renderTable({
        onRowsRendered: params => ({ startIndex, stopIndex } = params)
      })
      expect(startIndex).toEqual(0)
      expect(stopIndex).toEqual(7)
    })

    it('should not call :onRowsRendered unless the start or stop indices have changed', () => {
      let numCalls = 0
      let startIndex
      let stopIndex
      const onRowsRendered = params => {
        startIndex = params.startIndex
        stopIndex = params.stopIndex
        numCalls++
      }
      renderOrUpdateTable({ onRowsRendered })
      expect(numCalls).toEqual(1)
      expect(startIndex).toEqual(0)
      expect(stopIndex).toEqual(7)
      renderOrUpdateTable({ onRowsRendered })
      expect(numCalls).toEqual(1)
      expect(startIndex).toEqual(0)
      expect(stopIndex).toEqual(7)
    })

    it('should call :onRowsRendered if the start or stop indices have changed', () => {
      let numCalls = 0
      let startIndex
      let stopIndex
      const onRowsRendered = params => {
        startIndex = params.startIndex
        stopIndex = params.stopIndex
        numCalls++
      }
      renderOrUpdateTable({ onRowsRendered })
      expect(numCalls).toEqual(1)
      expect(startIndex).toEqual(0)
      expect(stopIndex).toEqual(7)
      renderOrUpdateTable({
        height: 50,
        onRowsRendered
      })
      expect(numCalls).toEqual(2)
      expect(startIndex).toEqual(0)
      expect(stopIndex).toEqual(2)
    })

    it('should not call :onRowsRendered if no rows are rendered', () => {
      let startIndex, stopIndex
      renderTable({
        height: 0,
        onRowsRendered: params => ({ startIndex, stopIndex } = params)
      })
      expect(startIndex).toEqual(undefined)
      expect(stopIndex).toEqual(undefined)
    })
  })
})
