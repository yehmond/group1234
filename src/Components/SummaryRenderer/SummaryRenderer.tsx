import React, { PureComponent } from "react";
import "./SummaryRenderer.scss";
import { Chip, Paper } from "@material-ui/core";

interface SummaryRendererProps {
    displayKey: string;
    value: string | string[];
    indented: boolean;
}

class SummaryRenderer extends PureComponent<SummaryRendererProps, {}> {
    render() {
        return (
            <div className="paper-container">
                <div className="summary-container">
                    <Paper elevation={4}>
                        <h3 className={this.props.indented ? "indent" : ""}>
                            {this.props.displayKey}
                        </h3>
                    </Paper>
                    {Array.isArray(this.props.value) && (
                        <div>
                            {this.props.value.map((val, index) => {
                                return (
                                    <Chip key={index} label={val} color="primary" />
                                );
                            })}
                        </div>
                    )}
                    {!Array.isArray(this.props.value) && (
                        <Chip label={this.props.value} color="primary" />
                    )}
                </div>
            </div>
        );
    }
}

export default SummaryRenderer;
