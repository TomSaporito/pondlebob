import React from 'react';

//
export default class SortableLineup extends React.Component{
  constructor(props){
    super(props);
    this.state={
        data: this.props.data
    };

    this.sort = this.sort.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);


  }

  sort(colors, dragging) {
    var data = this.state.data;
    data.colors = colors;
    data.dragging = dragging;
    this.setState({data: data});
  }
  dragEnd() {
    this.sort(this.state.data.colors, undefined);
  }
  dragStart(e) {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", null)
  }
  dragOver(e) {
    e.preventDefault();
    var over = e.currentTarget
    var dragging = this.state.data.dragging;
    var from = isFinite(dragging) ? dragging : this.dragged;
    var to = Number(over.dataset.id);
    if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    if(from < to) to--;

    // Move from 'a' to 'b'
    var items = this.state.data.colors;
    items.splice(to, 0, items.splice(from,1)[0]);
    this.sort(items, to);
  }
  render() {

    var listItems = this.state.data.colors.map(function(item, i) {
      var dragging = (i == this.state.data.dragging) ? "dragging" : "";
      return (
        <li data-id={i}
            className={dragging}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragOver={this.dragOver}
            onDragStart={this.dragStart}>
          {item}
        </li>
      );
    }, this);

    return (
        <div>
            <h1>
                colors
            </h1>
            <ol>{listItems}</ol>

            <pre>App State: <br /><br/>{JSON.stringify(this.state,0,2)}</pre>


        </div>)
  }
}