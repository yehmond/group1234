import React, { PureComponent } from 'react';
import './SummaryRenderer.scss';

interface SummaryRendererProps {
    displayKey: string;
    value: string | string[];
    indented: boolean;
}

class SummaryRenderer extends PureComponent<SummaryRendererProps, {}> {

  render() {
    return (
        <div className="summary-container">
            <h3 className={this.props.indented ? 'indent': ''}>{this.props.displayKey}</h3>
            {Array.isArray(this.props.value) && (
            <div>
                {this.props.value.map((val) => {
                    return <p key={val}>{val}</p>
                })}
            </div>
            )}
            {!Array.isArray(this.props.value) && (
                <p>{this.props.value}</p>
            )}
        </div>

    );
  }
}

export default SummaryRenderer;
