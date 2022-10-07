import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let pages = []
        for (let i = 1; i <= Math.ceil(this.props.totalOperationsNumber / this.props.postsToDisplayNumber); i++) {
            pages.push(i)
        }
        return (
            <div class="pagination mb-4">
                <a href="#">«</a>
                {
                    pages.map((page, i) => {
                        if (this.props.currentPage === page) {
                            return <a href="#" key={i} className="active" onClick={() => this.props.setCurrentPage(page)}>{page}</a>
                        } else {
                            return <a href="#" key={i} onClick={() => this.props.setCurrentPage(page)}>{page}</a>
                        }

                    })
                }
                <a href="#">...</a>
                <a href="#">»</a>
            </div>
        )
    }
}
