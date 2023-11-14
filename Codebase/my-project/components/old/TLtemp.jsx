/* eslint-disable no-console */
import React, { Component } from "react";
import moment from "moment";

import Timeline, {
  TimelineMarkers,
  TimelineHeaders,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  CustomHeader,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";


var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end"
};

const g1 = [{ id: 1 }];

const i1 = [
  {
    id: 1,
    group: 1,
    title: "Title",
    tip: "additional information",
    color: "rgb(158, 14, 206)",
    selectedBgColor: "rgba(, 166, 244, 1)",
    bgColor: "rgba(225, 166, 244, 0.6)"
  },
  {
    id: 2,
    group: 1,
    title: "Random title",
    start_time: moment().add(4, "hour"),
    end_time: moment().add(8, "hour"),
    canMove: true,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
      "data-custom-attribute": "Random content",
      "aria-hidden": true,
      onDoubleClick: () => {
        console.log("You clicked double!");
      },
      className: "weekend",
      style: {
        background: "fuchsia"
      }
    }
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour")
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    const groups = g1;
    const items = i1;
    //const { groups, items } = generateFakeData();
    const visibleTimeStart = moment().startOf("day").valueOf();
    const visibleTimeEnd = moment().startOf("day").add(1, "day").valueOf();

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd
    };
  }

  handleCanvasClick = (groupId, time) => {
    console.log("Canvas clicked", groupId, moment(time).format());
  };

  handleCanvasDoubleClick = (groupId, time) => {
    console.log("Canvas double clicked", groupId, moment(time).format());
  };

  handleCanvasContextMenu = (group, time) => {
    console.log("Canvas context menu", group, moment(time).format());
  };

  handleItemClick = (itemId, _, time) => {
    console.log("Clicked: " + itemId, moment(time).format());
  };

  handleItemSelect = (itemId, _, time) => {
    console.log("Selected: " + itemId, moment(time).format());
  };

  handleItemDoubleClick = (itemId, _, time) => {
    console.log("Double Click: " + itemId, moment(time).format());
  };

  handleItemContextMenu = (itemId, _, time) => {
    console.log("Context Menu: " + itemId, moment(time).format());
  };

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  onPrevClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart;
      return {
        visibleTimeStart: state.visibleTimeStart - zoom,
        visibleTimeEnd: state.visibleTimeEnd - zoom
      };
    });
  };

  onNextClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart;
      console.log({
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom
      });
      return {
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom
      };
    });
  };

  render() {
    const { groups, items, visibleTimeStart, visibleTimeEnd } = this.state;

    return (
      <div>
        <button onClick={this.onPrevClick}>{"< Prev   "}</button>
        <button onClick={this.onNextClick}>{"   Next >"}</button>
        <Timeline className="px=50"
          groups={groups}
          items={items}
          keys={keys}
          sidebarWidth={0}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onCanvasClick={this.handleCanvasClick}
          onCanvasDoubleClick={this.handleCanvasDoubleClick}
          onCanvasContextMenu={this.handleCanvasContextMenu}
          onItemClick={this.handleItemClick}
          onItemSelect={this.handleItemSelect}
          onItemContextMenu={this.handleItemContextMenu}
          onItemMove={this.handleItemMove}
          //onItemResize={this.handleItemResize}
          onItemDoubleClick={this.handleItemDoubleClick}
          buffer={1}
        >
          <TimelineMarkers>
            <TodayMarker />
            <CustomMarker
              date={moment().startOf("day").valueOf() + 1000 * 60 * 60 * 2}
            />
            <CustomMarker date={moment().add(3, "day").valueOf()}>
              {({ styles }) => {
                const newStyles = { ...styles, backgroundColor: "blue" };
                return <div style={newStyles} />;
              }}
            </CustomMarker>
            <CursorMarker />
          </TimelineMarkers>
        </Timeline>
      </div>
    );
  }
}
