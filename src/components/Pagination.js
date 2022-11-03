import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    let pages = [];
    for (
      let i = 1;
      i <=
      Math.ceil(
        this.props.totalOperationsNumber / this.props.postsToDisplayNumber
      );
      i++
    ) {
      pages.push(i);
    }
    return pages.length ? (
      <div class="pagination mb-4">
        <a href={() => null}>«</a>
        {pages.map((page, i) => {
          if (this.props.currentPage === page) {
            if (this.props.type && this.props.type === "targets") {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page, "targets")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "tasks") {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page, "tasks")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "notes") {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page, "notes")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "relations") {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page, "relations")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "relatedBy") {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page, "relatedBy")}
                >
                  {page}
                </a>
              );
            } else {
              return (
                <a
                  href={() => null}
                  key={i}
                  className="active"
                  onClick={() => this.props.setCurrentPage(page)}
                >
                  {page}
                </a>
              );
            }
          } else {
            if (this.props.type && this.props.type === "targets") {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page, "targets")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "tasks") {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page, "tasks")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "notes") {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page, "notes")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "relations") {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page, "relations")}
                >
                  {page}
                </a>
              );
            } else if (this.props.type && this.props.type === "relatedBy") {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page, "relatedBy")}
                >
                  {page}
                </a>
              );
            } else {
              return (
                <a
                  href={() => null}
                  key={i}
                  onClick={() => this.props.setCurrentPage(page)}
                >
                  {page}
                </a>
              );
            }
          }
        })}
        <a href={() => null}>...</a>
        <a href={() => null}>»</a>
      </div>
    ) : (
      <></>
    );
  }
}
