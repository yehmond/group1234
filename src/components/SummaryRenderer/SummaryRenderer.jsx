import React, { Component } from "react";
import "./SummaryRenderer.scss";
import { Chip, Paper } from "@material-ui/core";

class SummaryRenderer extends Component {
    render() {
        return (
            <div className="paper-container">
                <div className="summary-container">
                    <h4 className={this.props.indented ? "indent" : ""}>
                        {this.props.displayKey}
                    </h4>
                    {Array.isArray(this.props.value) && (
                        <div>
                            {this.props.value.map((val, index) => {
                                return (
                                    <Paper key={index}>
                                        <h3>{val}</h3>
                                    </Paper>
                                );
                            })}
                        </div>
                    )}
                    {!Array.isArray(this.props.value) && (
                        <Paper>
                            <h3>{this.props.value}</h3>
                        </Paper>
                    )}
                </div>
            </div>
        );
    }
}

export default SummaryRenderer;
